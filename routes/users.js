const express = require('express');
const db = require('../utils/users');
const parser = require('body-parser');
const router = express.Router();

//mokk data

const mokUser1 = {
  email: 'pupkin@mail.com',
  firstName: 'Vasia',
  lastName: 'Pupkin',
  birthDate: '1990-01-01T19:00:00',
  gender: 'male',
  mobile: '+375297777777',
  citizen: 'town',
  password: '123456'
};

const mokUser2 = {
  email: 'pupkina@mail.com',
  firstName: 'Vasilisa',
  lastName: 'Pupkina',
  birthDate: '1995-01-01T19:00:00',
  gender: 'female',
  mobile: '+375296666666',
  citizen: 'town',
  password: '654321'
};

db.setUser(mokUser1);

db.setUser(mokUser2);

console.log(db);

router.use(parser.json());

router.use((err, req, res, next) => {
  if (err) {
    res.status(400);
		res.json({request: 'JSON data failed!'});
  } else {
    next();
  }
})

router.route('')
.get((req, res) => {
	const idIn  = db.findUserById(req.query.id);

	if (idIn) {
		const id = Object.keys(idIn)[0];
		idIn[id].id = id;
		res.json(idIn[id]);
	} else {
		res.status(404);
		res.json({request: 'failed'});
	}
})
.post((req, res) => {
	const result = db.setUser(req.body);

	console.log(db);

	if (!result) {
		res.status(302);
		return res.json({reqest: 'User already have been registered!'});
	}

	res.json(result);
})

module.exports = router;