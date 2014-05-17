(function () {
    angular.module('angularCustApp').factory('instagram', ['$http',
        function ($http) {
            return {
                fetchPopular: function (callback) {
                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

                    $http.jsonp(endPoint).success(function (response) {
                        callback(response.data);
                    });
                }
            };
        }]);

    var CustomersController =
        function ($scope, $log, $window, instagram, customersFactory, appSettings) {
            $scope.sortBy = 'name';
            $scope.reverse = false;
            $scope.pics = [];
            $scope.customers = [];
			$scope.appSettings = appSettings;

            function init() {
                customersFactory.getCustomers()
					.success( function(customers) {
						$log.log("getCustomers.success: Yea!");
						$scope.customers = customers;
					})
					.error( function(data, status, headers, config) {
						$log.log("getCustomers.error: " + status);
						console.log( status );
					});
            }

            init();

            $scope.doSort = function (propName) {
                $scope.sortBy = propName;
                $scope.reverse =  !$scope.reverse;
            };

			$scope.deleteCustomer = function (customerId) {
				customersFactory.deleteCustomer(customerId).success( function(status) {
					if( status) {
						for(var i=0, len=$scope.customers.length; i < len; i++) {
							if ($scope.customers[i].id === customerId ) {
								$scope.customers.splice(i,1);
								break;
							}
						}
					}
					else {
						$window.alert('Unable to delete customer #' + customerId);
					}
				})
				.error(function(data, status, headers, config) {
					$window.alert('Delete error ' + data + ' ' + status);
				});

			}

            // Call the service when the column header is clicked
            $scope.refreshImages = function () {
                instagram.fetchPopular(function (data) {
                    $scope.pics = data;

                    for (var i = 0; i < $scope.customers.length; i++) {
                        $scope.customers[i].pic = data[i];
                    }
                });
            };

            // Call the service when the controller is first invoked
            $scope.refreshImages();
        };

    CustomersController.$inject = ['$scope', '$log', '$window', 'instagram', 'customersFactory', 'appSettings'];
    angular.module('angularCustApp').controller('CustomersController', CustomersController);

}());
