app.factory('doctorsFactory', ['$http', '$cookies', function($http, $cookies) {

	function DoctorConstructor() {
		var _this = this;

		this.index = function(callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.get('/doctors').then(function(returned_data){
				doctors = returned_data.data;
				callback(returned_data.data);
			});
		};

		this.show = function(id, callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.get('/doctors/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.create = function(newDoctor, callback) {
			$http.post('/doctors', newDoctor).then(function(returned_data){
				if (typeof(callback) == 'function'){
					doctor = returned_data.data;
					callback(returned_data.data);
				}
			});
		};

		this.update = function(id, updateDoctor, callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.put('/doctors/'+id, updateDoctor).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.delete = function(id, callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.delete('/doctors/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.login = function(doctor, callback) {
			$http.post('/doctors/login', doctor).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
	}

	return (new DoctorConstructor());
}]);