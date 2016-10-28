app.factory('usersFactory', ['$http', '$cookies', function($http, $cookies) {

	function UserConstructor() {
		var _this = this;

		this.index = function(callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.get('/users').then(function(returned_data){
				callback(returned_data.data);
			});
		};

		this.show = function(id, callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.get('/users/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.create = function(newUser, callback) {
			$http.post('/users', newUser).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		};

		this.update = function(id, updateUser, callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.put('/users/'+id, updateUser).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.delete = function(id, callback) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
			$http.delete('/users/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.login = function(user, callback) {
			$http.post('/users/login', user).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
	}
	
	return (new UserConstructor());
}]);