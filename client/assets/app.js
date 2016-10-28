var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/partials/index.html',
	})
	.when('/users', {
		templateUrl: '/partials/user/index.html',
		controller: 'userController'
	})
	.when('/users/edit/:id', {
		templateUrl: '/partials/user/edit.html',
		controller: 'userController'
	})
	.when('/users/login', {
		templateUrl: '/partials/user/login.html',
		controller: 'userController'
	})
	.when('/users/show/:id', {
		templateUrl: '/partials/user/show.html',
		controller: 'userController'
	})
	.when('/doctors', {
		templateUrl: '/partials/doctor/index.html',
		controller: 'doctorController'
	})
	.when('/doctors/edit/:id', {
		templateUrl: '/partials/doctor/edit.html',
		controller: 'doctorController'
	})
	.when('/doctors/login', {
		templateUrl: '/partials/doctor/login.html',
		controller: 'doctorController'
	})
	.when('/doctors/show/:id', {
		templateUrl: '/partials/doctor/show.html',
		controller: 'doctorController'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});