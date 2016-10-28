var Doctor = require('../models/doctor.js');

function DoctorsController(){
	this.index = function(req, res) {
		Doctor.get_doctors(function(status) {
			var index_status = status;
			if(index_status.error) {
				res.json(index_status);
			}
			else{
				res.json(index_status.data);
			}
		});
	};

	this.show = function(req, res) {
		Doctor.get_doctor(req.params.id, function(status) {
			var show_status = status;
			if(show_status.error) {
				res.json(show_status);
			}
			else{
				res.json(show_status.data);
			}
		});
	};

	this.create = function(req, res){
		Doctor.create_doctor(req.body, function(status) {
			var create_status = status;
			if(create_status.error) {
				res.json(create_status);
			}
			else{
				res.json(create_status);
			}
		});
	};

	this.update = function(req, res) {
		Doctor.update_doctor(req.params.id, req.body, function(status) {
			var update_status = status;
			if(update_status.error) {
				res.json(update_status);
			}
			else{
				res.json(update_status.data);
			}
		});
	};

	this.delete = function(req, res){
		Doctor.delete_doctor(req.params.id, function(status) {
			var delete_status = status;
			if(delete_status.error) {
				res.json(delete_status.errors);
			}
			else{
				res.json(delete_status.data);
			}
		});
	};

	this.login = function(req, res){
		Doctor.login_doctor(req.body, function(status) {
			var login_status = status;
			if(login_status.error) {
				res.json(login_status);
			}
			else{
				res.json(login_status);
			}
		});
	};
	
}

module.exports = new DoctorsController();
