const puppeteer = require('puppeteer');

async function builder(url) {
  console.log('Starting PDF conversion of ', url);

  // if is not using docker, the path is not necessary if system already has Google Chrome.
  const path = process.env.isDocker ? '/usr/bin/google-chrome-stable' : undefined;

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
