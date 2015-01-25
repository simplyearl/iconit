'use strict';

var iconit = angular.module('iconit', [
  'ngAnimate', 
  'ui.router', 
  'SafeApply'
]);

iconit.config(function($stateProvider, $urlRouterProvider, $animateProvider) {
  $urlRouterProvider.when('', '/home');
});

iconit.run();