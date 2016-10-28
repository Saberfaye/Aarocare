var users = require('../controllers/users.js');
var doctors = require('../controllers/doctors.js');
var path = require( 'path' );

module.exports = function(app){
	app.get('/users', function(req, res) {
		users.index(req, res);
	})
	app.get('/users/:id', function(req, res) {
		users.show(req, res);
	})
	app.post('/users', function(req, res) {
		users.create(req, res);
	})
	app.put('/users/:id', function(req, res) {
		users.update(req, res);
	})
	app.delete('/users/:id', function(req, res) {
		users.delete(req, res);
	})
	app.post('/users/login', function(req, res) {
		users.login(req, res);
	})
	app.get('/doctors', function(req, res) {
		doctors.index(req, res);
	})
	app.get('/doctors/:id', function(req, res) {
		doctors.show(req, res);
	})
	app.post('/doctors', function(req, res) {
		doctors.create(req, res);
	})
	app.put('/doctors/:id', function(req, res) {
		doctors.update(req, res);
	})
	app.delete('/doctors/:id', function(req, res) {
		doctors.delete(req, res);
	})
	app.post('/doctors/login', function(req, res) {
		doctors.login(req, res);
	})

	app.get('/*', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	})
}