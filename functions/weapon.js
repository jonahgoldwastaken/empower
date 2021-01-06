const AWS = require('aws-sdk')
const chromium = require('chrome-aws-lambda')
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

  let image = await findWeaponInBucket(parsedMunicipality)
  if (!image) {
    const href = await scrapeWeapon(parsedMunicipality)
    image = await uploadWeaponToBucket(href, parsedMunicipality)
  }

  return {
    statusCode: 200,
    body: image,
  }
}

async function findWeaponInBucket(municipality) {
  const hasImage = await got(
    `https://empower.s3.eu-central-003.backblazeb2.com/${municipality}.svg`
  )
    .then(res => res.statusCode === 200)
    .catch(() => false)

  return hasImage
    ? `https://empower.s3.eu-central-003.backblazeb2.com/${municipality}.svg`
    : false
}

async function uploadWeaponToBucket(image, municipality) {
  const { BB_KEYID, BB_APPKEY } = process.env
  AWS.config.credentials = {
    accessKeyId: BB_KEYID,
    secretAccessKey: BB_APPKEY,
  }
  const s3 = new AWS.S3({
    endpoint: 's3.eu-central-003.backblazeb2.com',
  })

  console.log('connected to S3')
  const pass = new stream.PassThrough()
  pipeline(got.stream(image), pass)

  console.log('Uploading file')
  await s3
    .upload({ Bucket: 'empower', Key: municipality + '.svg', Body: pass })
    .promise()
}

async function scrapeWeapon(municipality) {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  })
  const page = await browser.newPage()
  console.log('page created')

  await page.setRequestInterception(true)

  page.on('request', request => {
    if (request.resourceType() === 'image') request.abort()
    else request.continue()
  })
  console.log('added request event listener')

  await page.goto(
    'https://nl.wikipedia.org/wiki/Lijst_van_wapens_van_Nederlandse_gemeenten'
  )

  console.log('navigated to page')

  const href = await page.$eval(
    `.gallery a.image[href*="${municipality.toLowerCase()}" i]`,
    a => a.href
  )

  await page.goto(href)
  await page.waitForSelector('a.internal')

  console.log('navigated to image page')

  const imageHref = await page.$eval('a.internal', a => a.href)

  console.log('got image url')

  await page.close()
  return imageHref
}
