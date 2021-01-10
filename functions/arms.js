const chromium = require('chrome-aws-lambda')
const got = require('got')

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
    image = await scrapeWeapon(parsedMunicipality)
    await sendUnknownImageToUploader(event, image, parsedMunicipality)
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: image,
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

async function scrapeWeapon(municipality) {
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
  return imageHref
}
