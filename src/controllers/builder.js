const builderService = require('../services/builder');

async function build(req, res) {
  try {
    const { url } = req.body;

    const pdf = await builderService.builder(url);

    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
    res.send(pdf);
  } catch (e) {
    res.json({
      err: e.toString(),
      stack: e.stack,
    });
  }
}

module.exports = {
  build,
};
