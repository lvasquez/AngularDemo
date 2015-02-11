'use strict';

angular.module('dynamicMenu')

.factory('DynamicMenuFactory', ['$resource',
    function($resource) {
        /* Strictly follow the JSON structure provided in dynamic-menu.json */
        return $resource('dynamic-menu/dynamic-menu.json', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    }
]).controller('DynamicMenuController', ['$scope', '$location', 'DynamicMenuFactory',
    function($scope, $location, DynamicMenuFactory) {
        $scope.navigationDetail = DynamicMenuFactory.query();
		$scope.navbarCollapsed = true;
        $scope.$on('$routeChangeSuccess', function() {
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
        templateUrl: 'dynamic-menu/dynamic-menu.html',
        replace: true,
    };
});