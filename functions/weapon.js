const AWS = require('aws-sdk')
const puppeteer = require('puppeteer')
const got = require('got')
const stream = require('stream')
const { promisify } = require('util')

const pipeline = promisify(stream.pipeline)

exports.handler = async function (event) {
  const browser = await puppeteer.launch()

  const { BB_KEYID, BB_APPKEY } = process.env
  AWS.config.credentials = {
    accessKeyId: BB_KEYID,
    secretAccessKey: BB_APPKEY,
  }

  const s3 = new AWS.S3({
    endpoint: 's3.eu-central-003.backblazeb2.com',
  })

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

  const bucketImage = await findWeaponInBucket(s3, parsedMunicipality)

  let image
  if (!bucketImage) {
    const href = await scrapeWeapon(browser, parsedMunicipality)
    image = await uploadWeaponToBucket(s3, href, parsedMunicipality)
  } else image = bucketImage

  await browser.close()

  return {
    statusCode: 200,
    body: image,
  }
}

async function findWeaponInBucket(s3, municipality) {
  return await s3
    .getObject({
      Bucket: 'empower',
      Key: `${municipality}.svg`,
    })
    .promise()
    .then(
      () =>
        `https://empower.s3.eu-central-003.backblazeb2.com/${municipality}.svg`
    )
    .catch(console.error)
}

async function uploadWeaponToBucket(s3, image, municipality) {
  const pass = new stream.PassThrough()
  pipeline(got.stream(image), pass)
  await s3
    .upload({ Bucket: 'empower', Key: municipality + '.svg', Body: pass })
    .promise()
}

async function scrapeWeapon(browser, municipality) {
  const page = await browser.newPage()

  await page.goto(
    'https://nl.wikipedia.org/wiki/Lijst_van_wapens_van_Nederlandse_gemeenten',
    { waitUntil: 'networkidle2' }
  )

  const allImageLinks = await page.$$eval(
    '#bodyContent #mw-content-text a.image',
    anchors => anchors.map(a => a.href)
  )
  console.log(allImageLinks)

  const href = allImageLinks.find(href =>
    href.toLowerCase().includes(municipality.toLowerCase())
  )

  await page.goto(href, { waitUntil: 'networkidle2' })

  const imageHref = await page.$eval(
    '#bodyContent .fullMedia a.internal',
    a => a.href
  )

  await page.close()
  return imageHref
}
