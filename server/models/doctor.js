var connection = require('../config/db.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var cert = require('../../key');

function DoctorModel(){
	this.get_doctors = function(callback) {
		connection.query("SELECT * FROM doctors", function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.get_doctor = function(id, callback) {
		connection.query("SELECT * FROM doctors WHERE id = ?", [id], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.create_doctor = function(doctor, callback) {
		var err = {};
		if(!doctor.first_name) {
			err.first_name = "First name is required";
		}
		else if(doctor.first_name.length < 2) {
			err.first_name = "First name needs at least 2 characters";
		}
		if(!doctor.last_name) {
			err.last_name = "Last name is required";
		}
		else if(doctor.last_name.length < 2) {
			err.last_name = "Last name needs at least 2 characters";
		}
		if(!doctor.sex) {
			err.sex = "Sex is required";
		}
		if(!doctor.date_of_birth) {
			err.date_of_birth = "Birthday is required";
		}
		else if(Date.parse(doctor.date_of_birth) > Date.now()) {
			err.date_of_birth = "Invalid birthday";
		}
		if(!doctor.type) {
			err.type = "Type is required";
		}
		if(!doctor.email) {
			err.email = "Email is required";
		}
		else if(!/[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/.test(doctor.email)) {
			err.email = "Invalid email address";
		}
		connection.query('SELECT id FROM doctors WHERE email = ?', [doctor.email], function(error, result) {
			if(result.length > 0) {
				err.email = "Email already exist, please use another one";
			}
			if(!doctor.password) {
				err.password = "Password is required";
			}
			else if(doctor.password.length < 8) {
				err.password = "Password needs at least 8 characters";
			}
			if(!doctor.password_confirm) {
				err.password_confirm = "Please confirm password";
			}
			else if(!err.password && doctor.password_confirm != doctor.password) {
				err.password_confirm = "Passwords don't match";
			}
			if(doctor.disease) {
				err.first_name = "Invalid input";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			doctor.password = bcrypt.hashSync(doctor.password, bcrypt.genSaltSync(8));
			var data = [doctor.first_name, doctor.middle_name, doctor.last_name, doctor.sex, doctor.date_of_birth, doctor.mobile, doctor.type, doctor.email, doctor.password];
			connection.query("INSERT INTO doctors SET first_name = ?, middle_name = ?, last_name = ?, sex = ?, date_of_birth = ?, mobile = ?, type = ?, email = ?, email_verified = false, certificated = false, password = ?, created_at = NOW(), updated_at = NOW()", data, function(err, result) {
				if(err){
					callback({error: true, errors: err});
				}
				else {
					jwt.sign({ id: result.insertId, first_name: doctor.first_name, iat: Math.floor(Date.now() / 1000) - 30 }, cert, { expiresIn: '2h' }, function(err, token) {
						callback({error: false, data: result, token: token});
					});
				}
			});
		});
	}

	this.update_doctor = function(id, doctor, callback) {
		var err = {};
		if(!doctor.first_name) {
			err.first_name = "First name is required";
		}
		else if(doctor.first_name.length < 2) {
			err.first_name = "First name needs at least 2 characters";
		}
		if(!doctor.last_name) {
			err.last_name = "Last name is required";
		}
		else if(doctor.last_name.length < 2) {
			err.last_name = "Last name needs at least 2 characters";
		}
		if(!doctor.sex) {
			err.sex = "Sex is required";
		}
		if(!doctor.date_of_birth) {
			err.date_of_birth = "Birthday is required";
		}
		else if(Date.parse(doctor.date_of_birth) > Date.now()) {
			err.date_of_birth = "Invalid birthday";
		}
		if(!doctor.type) {
			err.type = "Type is required";
		}
		if(doctor.registration && !/(ftp|http|https):\/\/[^ "]+/.test(doctor.registration)) {
			err.registration = "Invalid registration url";
		}
		if(JSON.stringify(err) !== '{}') {
			callback({error: true, errors: err});
			return;
		}
		var data = [doctor.first_name, doctor.middle_name, doctor.last_name, doctor.sex, doctor.date_of_birth, doctor.mobile, doctor.type, doctor.registration, doctor.address, doctor.care_city, id];
		connection.query("UPDATE doctors SET first_name = ?, middle_name = ?, last_name = ?, sex = ?, date_of_birth = ?, mobile = ?, type = ?, registration = ?, address = ?, care_city = ?, updated_at = NOW() WHERE id = ?", data, function(err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.delete_doctor = function(id, callback) {
		connection.query("DELETE FROM doctors WHERE id = ?", [id], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.login_doctor =function(doctor, callback) {
		var err = {};
		if(!doctor.email) {
			err.email = "Email is required";
		}
		if(!doctor.password) {
			err.password = "Password is required";
		}
		if(JSON.stringify(err) !== '{}') {
			callback({error: true, errors: err});
			return;
		}
		connection.query("SELECT * FROM doctors WHERE email = ?", [doctor.email], function (error, result) {
			if(result.length < 1) {
				err.email = "Email address and password don't match";
			}
			else if(!bcrypt.compareSync(doctor.password, result[0].password)) {
				err.email = "Email address and password don't match";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			jwt.sign({ id: result[0].id, first_name: result[0].first_name, iat: Math.floor(Date.now() / 1000) - 30 }, cert, { expiresIn: '2h' }, function(err, token) {
				callback({error: false, data: result, token: token});
			});
		});
	}
}

module.exports = new DoctorModel();