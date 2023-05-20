const express = require('express');
const db = require('../utils/users');
const { bodyParser } = require('json-server');
const router = express.Router();

const userDB = [];

router.use(bodyParser);

router.route('')
.get(getUsers)
.post()

function getUsers(req, res) {
  res.json(db);
}

module.exports = router;