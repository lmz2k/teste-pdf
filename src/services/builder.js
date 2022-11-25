const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

async function builder(url) {
  const browser = await puppeteer.launch({
    headless: chromium.headless,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();

  await page.emulateMediaType('screen');

  await page.goto(url, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({
    printBackground: true,
    width: 447,
    height: 700,
  });

  await browser.close();
  return pdf;
}

module.exports = {
  builder,
};
