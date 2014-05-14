(function () {
    angular.module('angularCustApp').factory('instagram', ['$http',
        function($http){
            return {
                fetchPopular: function(callback){
                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

                    $http.jsonp(endPoint).success(function(response){
                        callback(response.data);
                    });
                }
	       }
        }]);

    var CustomersController =
        function ($scope, $timeout, instagram) {
            $scope.sortBy = 'name';
            $scope.reverse = false;
            $scope.pics = [];

            $scope.customers = [
                {joined: '1965-25-1', name: 'Zed', city: 'Las Vegas', orderTotal: 19.99, pic: ''},
                {joined: '2014-1-1', name: 'Dave', city: 'Camarillo', orderTotal: 9.999534, pic: ''},
                {joined: '2014-2-2', name: 'Drew', city: 'LA', orderTotal: 9.01, pic: ''},
                {joined: '2014-3-1', name: 'Jennifer', city: 'Napa', orderTotal: 9.01, pic: '' } ];

            $scope.doSort = function (propName) {
                $scope.sortBy = propName;
                $scope.reverse =  !$scope.reverse;
            };

            // Call the service (once?) when the controller is first invoked


            $scope.refreshImages = function () {
                instagram.fetchPopular(function (data) {
                    $scope.pics = data;
                    for( i = 0; i < $scope.customers.length; i++ ) {
                        $scope.customers[i].pic = data[i];
                    }
                });
            };

            $scope.refreshImages();
        }

    angular.module('angularCustApp').controller('CustomersController', CustomersController);

}());




