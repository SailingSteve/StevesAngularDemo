(function () {
    var OrdersController = function ($scope, $routeParams, $log, customersFactory, appSettings) {
        var customerId = $routeParams.customerId;
        $scope.customer = null;
		$scope.appSettings = appSettings;

        function init() {
			customersFactory.getCustomer(customerId)
					.success( function(customer) {
						$log.log("getCustomer.success: " + customerId);
						$scope.customer = customer;
					})
					.error( function(data, status, headers, config) {
						$log.log("getCustomer.error: " + status);
					});

            $scope.customer = customersFactory.getCustomer(customerId);
        }

        init();
    };

    OrdersController.$inject = ['$scope', '$routeParams', '$log', 'customersFactory','appSettings'];

    angular.module('angularCustApp').controller('OrdersController', OrdersController);

}());
