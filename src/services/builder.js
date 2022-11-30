const puppeteer = require('puppeteer');

async function builder(url) {
  const path = !process.env.IS_LOCAL ? '/usr/bin/google-chrome-stable' : undefined;

  console.log('Launching Browser..');
  const browser = await puppeteer.launch({
    executablePath: path,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--no-sandbox',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-skip-list',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--hide-scrollbars',
      '--disable-notifications',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-component-extensions-with-background-pages',
      '--disable-extensions',
      '--disable-features=TranslateUI,BlinkGenPropertyTrees',
      '--disable-ipc-flooding-protection',
      '--disable-renderer-backgrounding',
      '--enable-features=NetworkService,NetworkServiceInProcess',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
      '--mute-audio',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--single-process',
      '--no-zygote',
      '--no-first-run',
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
