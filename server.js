const cities = require('./routes/cities');
const jsonServer = require('json-server');
const server = jsonServer.create();



server.use('/cities', cities);

server.use('', (req, res) => res.send('Server started on http://localhost:3200'));

server.listen(3200, () => console.log('Server started: http://localhost:3200'));