const puppeteer = require('puppeteer');

async function builder(url) {
  console.log('Starting P DF conversion of ', url);

  const path = !process.env.IS_LOCAL ? '/usr/bin/google-chrome-stable' : undefined;

  const browser = await puppeteer.launch({
    timeout: 0,
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

  const page = await browser.newPage();

  await page.emulateMediaType('screen');
  await page.goto(url, { waitUntil: 'networkidle0' });

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
