const db = require('../utils/convert');
const { bodyParser } = require('json-server');
const express = require('express');
const router = express.Router();

const get = db();
const base = get();


router.use(bodyParser);

router.route('')
.get(getData)

function getData(req, res) {
  res.json(base);
}

module.exports = router;