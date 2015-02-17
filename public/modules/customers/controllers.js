'use strict';
 
var app = angular.module('Customers');

// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function ($rootScope, $templateCache) {
  $rootScope.$on('$viewContentLoaded', function () {
    $templateCache.removeAll();
  });
});

app.controller('CustomersController', ['$scope', 'CustomersFactory', function ($scope, CustomersFactory) {

	 $scope.dataSource = CustomersFactory;
	
	 $scope.mainGridOptions = {
                dataSource: $scope.dataSource,
                toolbar: [{name:"create", text: "Create"}],
				editable: "popup",
				scrollable: true,
				sortable: true,
				filterable: true,
				pageable: {
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				},
				columns: [
						{
							field: "Id",
							title: "Id"
						},
						{
							field: "name",
							title: "Name"
						},
						{
							field: "address",
							title: "Address"
						},
						{
							field: "phone",
							title: "Phone"
						},
						{
							field: "email",
							title: "E-mail"
						},
						{
							field: "status",
							title: "Status",
							template: '<input type="checkbox" #=status ? "checked=checked" : "" # disabled="disabled" ></input>'
						},
						{
							command: ["edit", "destroy"],
							width: "200px"
						}
				]
            };
		
}]);

