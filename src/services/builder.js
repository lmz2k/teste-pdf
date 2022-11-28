const puppeteer = require('puppeteer');

async function builder(url) {
  console.log('Starting PDF conversion of ', url);

  const path = !process.env.IS_LOCAL ? '/usr/bin/google-chrome-stable' : undefined;

  console.log('Launching Browser..');
  const browser = await puppeteer.launch({
    executablePath: path,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--use-gl=egl',
      '--disable-gpu',
      '--no-sandbox',
    ],
    headless: true,
  });

  console.log('Open a new Page..');
  const page = await browser.newPage();

  await page.emulateMediaType('screen');

  console.log('Fetching the URL..');
  await page.goto(url, { waitUntil: 'networkidle0' });

  console.log('Bulding the PDF the URL..');
  const pdf = await page.pdf({
    printBackground: true,
    width: 447,
    height: 700,
  });

  console.log('Ending PDF conversion of ', url);
  await browser.close();
  return pdf;
}

module.exports = {
  builder,
};
