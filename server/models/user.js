var connection = require('../config/db.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var cert = require('../../key');

function UserModel(){
	this.get_users = function(callback) {
		connection.query("SELECT * FROM users", function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.get_user = function(id, callback) {
		connection.query("SELECT * FROM users WHERE id = ?", [id], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.create_user = function(user, callback) {
		var err = {};
		if(!user.first_name) {
			err.first_name = "First name is required";
		}
		else if(user.first_name.length < 2) {
			err.first_name = "First name needs at least 2 characters";
		}
		if(!user.last_name) {
			err.last_name = "Last name is required";
		}
		else if(user.last_name.length < 2) {
			err.last_name = "Last name needs at least 2 characters";
		}
		if(!user.sex) {
			err.sex = "Sex is required";
		}
		if(!user.date_of_birth) {
			err.date_of_birth = "Birthday is required";
		}
		else if(Date.parse(user.date_of_birth) > Date.now()) {
			err.date_of_birth = "Invalid birthday";
		}
		if(!user.email) {
			err.email = "Email is required";
		}
		else if(!/[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/.test(user.email)) {
			err.email = "Invalid email address";
		}
		connection.query('SELECT id FROM users WHERE email = ?', [user.email], function(error, result) {
			if(result.length > 0) {
				err.email = "Email already exist, please use another one";
			}
			if(!user.password) {
				err.password = "Password is required";
			}
			else if(user.password.length < 8) {
				err.password = "Password needs at least 8 characters";
			}
			if(!user.password_confirm) {
				err.password_confirm = "Please confirm password";
			}
			else if(!err.password && user.password_confirm != user.password) {
				err.password_confirm = "Passwords don't match";
			}
			if(user.disease) {
				err.first_name = "Invalid input";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
			var data = [user.first_name, user.middle_name, user.last_name, user.sex, user.date_of_birth, user.mobile, user.email, user.password];
			connection.query("INSERT INTO users SET first_name = ?, middle_name = ?, last_name = ?, sex = ?, date_of_birth = ?, mobile = ?, email = ?, email_verified = false, password = ?, created_at = NOW(), updated_at = NOW()", data, function(error, result) {
				if(error){
					callback({error: true, errors: error});
				}
				else {
					jwt.sign({ id: result.insertId, first_name: user.first_name, iat: Math.floor(Date.now() / 1000) - 30 }, cert, { expiresIn: '2h' }, function(err, token) {
						callback({error: false, data: result, token: token});
					});
				}
			});
		});
	}

	this.update_user = function(id, user, callback) {
		var err = {};
		if(!user.first_name) {
			err.first_name = "First name is required";
		}
		else if(user.first_name.length < 2) {
			err.first_name = "First name needs at least 2 characters";
		}
		if(!user.last_name) {
			err.last_name = "Last name is required";
		}
		else if(user.last_name.length < 2) {
			err.last_name = "Last name needs at least 2 characters";
		}
		if(!user.sex) {
			err.sex = "Sex is required";
		}
		if(!user.date_of_birth) {
			err.date_of_birth = "Birthday is required";
		}
		else if(Date.parse(user.date_of_birth) > Date.now()) {
			err.date_of_birth = "Invalid birthday";
		}
		if(user.disease && user.disease.length > 1000) {
			err.disease = "Too long, please limit the field to less than 1000 characters";
		}
		if(JSON.stringify(err) !== '{}') {
			callback({error: true, errors: err});
			return;
		}
		var data = [user.first_name, user.middle_name, user.last_name, user.sex, user.date_of_birth, user.mobile, user.disease, user.address, user.care_city, id];
		connection.query("UPDATE users SET first_name = ?, middle_name = ?, last_name = ?, sex = ?, date_of_birth = ?, mobile = ?, disease = ?, address = ?, care_city = ?, updated_at = NOW() WHERE id = ?", data, function(err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.delete_user = function(id, callback) {
		connection.query("DELETE FROM users WHERE id = ?", [id], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.login_user =function(user, callback) {
		var err = {};
		if(!user.email) {
			err.email = "Email is required";
		}
		if(!user.password) {
			err.password = "Password is required";
		}
		if(JSON.stringify(err) !== '{}') {
			callback({error: true, errors: err});
			return;
		}
		connection.query("SELECT * FROM users WHERE email = ?", [user.email], function (error, result) {
			if(result.length < 1) {
				err.email = "Email address and password don't match";
			}
			else if(!bcrypt.compareSync(user.password, result[0].password)) {
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

module.exports = new UserModel();