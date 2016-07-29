(function () {
  'use strict';

  angular
    .module('votDiaspora')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home.html',
          controller: 'DiasporaCtrl as vm'
        })
        .state('test1', {
          url: '/test1',
          templateUrl: 'test1.html',
          controller: 'DiasporaCtrl as vm'
        })
        .state('test2', {
          url: '/test2',
          templateUrl: 'test2.html',
          controller: 'DiasporaCtrl as vm'
        });
    $urlRouterProvider.otherwise('/home');
  }
}());
