const builderService = require('../services/builder');

async function build(req, res) {
  try {
    const { url } = req.body;

    console.log('Starting PDF conversion of ', url);
    const pdf = await builderService.builder(url);

    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });

    console.log('Returning the PDF...');
    res.send(pdf);
  } catch (e) {
    res.json({
      err: e.toString(),
      stack: e.stack,
    }).status(400);
  }
}

module.exports = {
  build,
};
