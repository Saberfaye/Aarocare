app.controller('userController', ['$scope', 'usersFactory', '$location', '$routeParams', '$cookies', function($scope, usersFactory, $location, $routeParams, $cookies) {
	
	$scope.showUsers = function() {
		usersFactory.index(function(data) {
			$scope.users = data;
		});
	}
	$scope.showUsers();

	$scope.showUser = function() {
		usersFactory.show($routeParams.id, function(data) {
			data[0].date_of_birth = new Date(data[0].date_of_birth);
			$scope.user = data[0];
		})
	}
	if($routeParams.id) {
		$scope.showUser();
	}
	
	$scope.addUser = function(){
		usersFactory.create($scope.user, function(data) {
			if(data.errors) {
				$scope.errors = {};
				$scope.errors.user = data.errors;
			}
			else {
				$cookies.put('token', data.token);
				$location.url('/users');
			}
		});
	}

	$scope.updateUser = function(){
		usersFactory.update($routeParams.id, $scope.user, function(data) {
			if(data.errors) {
				$scope.errors = data.errors;
			}
			else{
				$location.url("/users");
			}
		});
	}

	$scope.deleteUser = function(id) {
		usersFactory.delete(id, function(data) {
			if(data.errors) {
				console.log(data.errors);
			}
			else {
				$scope.showUsers();
			}
		});
	}

	$scope.loginUser = function(){
		usersFactory.login($scope.user1, function(data) {
			if(data.errors) {
				$scope.errors = {};
				$scope.errors.user1 = data.errors;
			}
			else {
				$cookies.put('token', data.token);
				$location.url('/users');
			}
		});
	}

	$scope.logoutUser = function() {
		$cookies.remove('token');
		$location.url('/');
	}

	$scope.propertyName = "updated_at";
	$scope.reverse = false;

	$scope.sortBy = function(propertyName) {
		$scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

}]);