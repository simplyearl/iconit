'use strict';

var iconit = angular.module('iconit', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'SafeApply',
  'xeditable'
]);

iconit.filter('isArray', function() {
  return function(input) {
    return angular.isArray(input);
  };
}).filter('isEditable', function() {
  return function(input) {
    return (input || '').indexOf('_') != 0;
  };
});

iconit.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');
});

//iconit.run();

iconit.controller('SearchController', ['$scope', '$http', function($scope, $http) {
  
  $scope.selected = undefined;
  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
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
  $scope.icons = undefined;
  
  $http.get('/api/owner/').success(function(data) {
    $scope.owners = data;
    for (var i = 0, j = $scope.owners.length; i < j; i++) {
      $scope.owners[i].selected = true; 
    }
  });
  
  $http.get('/api/icon/').success(function(data) {
    $scope.icons = data;
  });
  
}]);

iconit.controller('AdminController', ['$scope', '$http', function($scope, $http) {
  
  $scope.owners = undefined;
  $scope.icons = undefined;
  $scope.tagStatuses = [
    {
      value: 0,
      text: 'Disabled'
    },
    {
      value: 1,
      text: 'Enabled'
    }
  ];
  
  $scope.save = function(data, form) {
    form.$saving = true;
    $http.put('/api/owner/' + data._id, data).success(function(data2) {
      form.$saving = false;
      console.log(data2);
    });
  };
  
  $http.get('/api/owner/').success(function(data) {
    $scope.owners = data;
  });
  
  $http.get('/api/icon/').success(function(data) {
    $scope.icons = data;
  });
  
}]);

iconit.directive('adminTable', function() {
  return {
    scope: {
      items: '=',
      title: '='
    },
    templateUrl: '../views/admin-table.html'
  };
});