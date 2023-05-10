const { bodyParser } = require('json-server');
const db = require('../db/cities');
const express = require('express');
const router = express.Router();

router.use(bodyParser);

router.route('')
.get(getData)

function getData(req, res) {
  console.log(req);
  res.json(db.cities);
}

module.exports = router; 