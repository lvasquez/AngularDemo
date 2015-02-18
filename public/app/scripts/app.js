'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Customers', ['kendo.directives', 'ngResource']);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
	'Customers',
    'ngRoute',
    'ngCookies',
	'dynamicMenu'
])
 
.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
		
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
		
		.when('/IndexCustomers', {
			templateUrl: 'modules/customers/views/Index.html',
			controller : 'CustomersController'
		})
		
		.when('/l2', {
			templateUrl: 'views/l2.html',
			controller : 'HomeController'
		})
		
		.when('/r1', {
			templateUrl: 'views/r1.html',
			controller : 'HomeController'
		})
		
		.when('/r2', {
			templateUrl: 'views/r2.html',
			controller : 'HomeController'
		})
		
		.when('/r3', {
			templateUrl: 'views/r3.html',
			controller : 'HomeController'
		})
 
        .otherwise({ redirectTo: '/login' });
		
		 $locationProvider.html5Mode(false).hashPrefix('app');
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line			
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
	