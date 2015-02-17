'use strict';
 
var services = angular.module('Customers');

var crudServiceBaseUrl  = 'http://localhost\:3000' + '/customers';

services.factory('CustomersFactory', function ($resource) {
	
        return new kendo.data.DataSource({
            transport: {
				 read: {
					 url: crudServiceBaseUrl,
					 dataType: "json"
				 },
				 create: {
					 url: crudServiceBaseUrl,
					 dataType: "json",
					 type: "POST"
				 },
			    update: {
                    url: function (data)
                    {
                        return crudServiceBaseUrl + "/" + data.Id + "/";
                    },
                    type: "put",
                    dataType: "json"
                },
                destroy: {
                    url: function (data)
                    {
                        return crudServiceBaseUrl + "/" + data.Id + "/";
                    },
                    dataType: "json"
                }
            },
            batch: false,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10,
			schema: {
				 model: {
					 id: "Id",
					 fields: {
						 Id: { editable: false, type: "number" },
						 name: { validation: { required: true} },
						 address: { validation: { required: true} },
						 phone: { validation: { required: true} },
						 email: { validation: { required: true} },
						 status: { type: "boolean" }
					 }
				 }
			},
            error: function (e)
            {
                alert(e.xhr.responseText);
            }
        });
});
