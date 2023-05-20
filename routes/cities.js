const db = require('../utils/convert');
const express = require('express');
const router = express.Router();

const base = db();

router.route('')
.get(getData)

function getData(req, res) {
  res.json(base);
}

module.exports = router;