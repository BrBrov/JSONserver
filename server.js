const db = require('./utils/convert');
const cities = require('./routes/cities');
const users = require('./routes/users');
const jsonServer = require('json-server');
const server = jsonServer.create();

server.use('/cities', cities);

server.use('/users', users);

server.use('', (req, res) => res.send('Server started on http://localhost:3200'));

server.listen(3200, () => console.log('Server started: http://localhost:3200'));