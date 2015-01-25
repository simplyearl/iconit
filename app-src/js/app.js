'use strict';

var iconit = angular.module('iconit', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'SafeApply'
]);

iconit.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');
});

//iconit.run();

iconit.controller('SearchController', ['$scope', '$http', function($scope, $http) {
  
  $scope.selected = undefined;
  $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };
  
}]);

iconit.controller('BrowseController', ['$scope', '$http', function($scope, $http) {
  
  $scope.owners = undefined;
  $http.get('api/owner/').success(function(data) {
    $scope.owners = data;
    for (var i = 0, j = $scope.owners.length; i < j; i++) {
      $scope.owners[i].selected = true; 
    }
  });
}]);