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
  const pass = new stream.PassThrough()
  pipeline(got.stream(image), pass)

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
  await page.goto(
    'https://nl.wikipedia.org/wiki/Lijst_van_wapens_van_Nederlandse_gemeenten',
    { waitUntil: 'networkidle2' }
  )
  const allImageLinks = await page.$$eval(
    '#bodyContent #mw-content-text a.image',
    anchors => anchors.map(a => a.href)
  )
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
