const chromium = require('chrome-aws-lambda')
const AWS = require('aws-sdk')
const got = require('got')
const stream = require('stream')
const { promisify } = require('util')

const pipeline = promisify(stream.pipeline)

exports.handler = async function (event) {
  const { municipality } = event.queryStringParameters
  if (!municipality)
    return {
      statusCode: 400,
      body: 'Please provide a municipality',
    }

  if (municipality.includes(', '))
    return {
      statusCode: 400,
      body: 'Please provide only one municipality',
    }

  const parsedMunicipality = municipality.replace(/\s/g, '_')

  let image = await findArmsInBucket(parsedMunicipality)
  if (!image) {
    const { imageHref, image: wikiImage } = await scrapeArms(parsedMunicipality)
    image = wikiImage
    await sendUnknownImageToUploader(event, imageHref, parsedMunicipality)
  }

  if (!image) {
    return {
      statusCode: 404,
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': `inline; filename="${municipality}.svg"`,
    },
    isBase64Encoded: true,
    body: image.Body.toString('base64'),
  }
}

async function sendUnknownImageToUploader(event, image, parsedMunicipality) {
  const url = `${
    event.headers.host.includes('http')
      ? event.headers.host
      : `http://${event.headers.host}`
  }/api/arms-background`
  try {
    await got(url, {
      searchParams: {
        originalURL: image,
        newKey: `${parsedMunicipality}.svg`,
      },
    })
  } catch (err) {
    console.error(err)
  }
}

async function findArmsInBucket(municipality) {
  const { BB_KEYID, BB_APPKEY } = process.env
  AWS.config.credentials = {
    accessKeyId: BB_KEYID,
    secretAccessKey: BB_APPKEY,
  }
  const s3 = new AWS.S3({
    endpoint: 's3.eu-central-003.backblazeb2.com',
  })
  try {
    const file = await s3
      .getObject({
        Bucket: 'empower',
        Key: municipality[0].toUpperCase() + municipality.slice(1) + '.svg',
      })
      .promise()
    return file
  } catch {
    return false
  }
}

async function scrapeArms(municipality) {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  })
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', request => {
    if (request.resourceType() === 'image') request.abort()
    else request.continue()
  })

  await page.goto(
    'https://nl.wikipedia.org/wiki/Lijst_van_wapens_van_Nederlandse_gemeenten'
  )

  const href = await page.$eval(
    `.gallery a.image[href*="${municipality.toLowerCase()}" i]`,
    a => a.href
  )

  await page.goto(href)
  await page.waitForSelector('a.internal')

  const imageHref = await page.$eval('a.internal', a => a.href)

  await page.close()
  const pass = new stream.PassThrough()
  await pipeline(got.stream(imageHref), pass)

  return {
    imageHref,
    image: {
      Body: pass,
    },
  }
}
