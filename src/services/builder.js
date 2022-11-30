const puppeteer = require('puppeteer');

async function builder(url) {
  const path = !process.env.IS_LOCAL ? '/usr/bin/google-chrome-stable' : undefined;

  console.log('Launching Browser..');
  const browser = await puppeteer.launch({
    executablePath: path,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--no-sandbox',
    ],
    headless: true,
    timeout: 60000,
  });

  try {
    console.log('Open a new Page..');
    const page = await browser.newPage();

    // await page.emulateMediaType('screen');

    console.log('Fetching the URL..');
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    console.log('Bulding the PDF the URL..');
    const pdf = await page.pdf({
      printBackground: true,
      width: 494.949494948,
      height: 700,
      scale: 2,
    });

    return pdf;
  } finally {
    console.log('Closing the browser..');
    await browser.close();
  }
}

module.exports = {
  builder,
};
