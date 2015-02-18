'use strict';

angular.module('dynamicMenu', ['ngResource']).factory('DynamicMenuFactory', ['$resource',
    function($resource) {
        /* Strictly follow the JSON structure provided in dynamic-menu.json */
        return $resource('modules/dynamic-menu/dynamic-menu.json', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    }
]).controller('DynamicMenuController', ['$rootScope', '$scope', '$location', 'DynamicMenuFactory', '$cookieStore',
    function($rootScope, $scope, $location, DynamicMenuFactory, $cookieStore) {
        $scope.navigationDetail = DynamicMenuFactory.query();
        $scope.$on('$routeChangeSuccess', function() {
		
			$rootScope.globals = $cookieStore.get('globals') || {};		
			if (!$rootScope.globals.currentUser)
				$scope.display = false;
			else 
				$scope.display = true;

            var path = '#app' + $location.path();
            var found = false;
            $scope.navigationDetail.$promise.then(function(result) {
                $scope.navigationDetail = result;
                angular.forEach($scope.navigationDetail.leftMenu, function(menu) {
                    if (path.indexOf(menu.url) == 0) {
                        $scope.navigationDetail.activeMenuId = menu.menuId;
                        found = true;
                    }
                });
                if (!found) {
                    angular.forEach($scope.navigationDetail.rightMenu, function(menu) {
                        if (path.indexOf(menu.url) == 0) {
                            $scope.navigationDetail.activeMenuId = menu.menuId;
                            found = true;
                        }
                    });
                }
            });
        });
    }
]).directive('navigationBar', function() {
    // Runs during compile
    return {
        name: 'navigationBar',
        scope: {
            navigationDetail: '='
        },
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'modules/dynamic-menu/dynamic-menu.html',
        replace: true,
    };
});