app.controller('doctorController', ['$scope', 'doctorsFactory', '$location', '$routeParams', '$cookies', function($scope, doctorsFactory, $location, $routeParams, $cookies) {
	
	$scope.showDoctors = function() {
		doctorsFactory.index(function(data) {
			$scope.doctors = data;
		});
	}
	$scope.showDoctors();

	$scope.showDoctor = function() {
		doctorsFactory.show($routeParams.id, function(data) {
			data[0].date_of_birth = new Date(data[0].date_of_birth);
			$scope.doctor = data[0];
		})
	}
	if($routeParams.id) {
		$scope.showDoctor();
	}
	
	$scope.addDoctor = function(){
		doctorsFactory.create($scope.doctor, function(data) {
			if(data.errors) {
				$scope.errors = {};
				$scope.errors.doctor = data.errors;
			}
			else {
				$cookies.put('token', data.token);
				$location.url('/doctors');
			}
		});
	}

	$scope.updateDoctor = function(){
		doctorsFactory.update($routeParams.id, $scope.doctor, function(data) {
			if(data.errors) {
				$scope.errors = data.errors;
			}
			else{
				$location.url("/doctors");
			}
		});
	}

	$scope.deleteDoctor = function(id) {
		doctorsFactory.delete(id, function(data) {
			if(data.errors) {
				console.log(data.errors);
			}
			else {
				$scope.showDoctors();
			}
		});
	}

	$scope.loginDoctor = function(){
		doctorsFactory.login($scope.doctor1, function(data) {
			if(data.errors) {
				$scope.errors = {};
				$scope.errors.doctor1 = data.errors;
			}
			else {
				$cookies.put('token', data.token);
				$location.url('/doctors');
			}
		});
	}

	$scope.logoutDoctor = function() {
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