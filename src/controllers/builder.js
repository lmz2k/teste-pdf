const builderService = require('../services/builder');

async function build(req, res) {
  const { url } = req.body;

  const pdf = await builderService.builder(url);

  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
  res.send(pdf);
}

module.exports = {
  build,
};
