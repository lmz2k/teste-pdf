const express = require('express');

const router = express.Router();
const BuilderController = require('./controllers/builder');

router.post('/build', BuilderController.build);

module.exports = router;
