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
      .state('home.rezident-corespondenta', {
        url: '/rezident-corespondenta',
        views: {
          '': {
            templateUrl: 'rezident-corespondenta.html'
          }
        }
      })
      .state('home.rezident-sectie', {
        url: '/rezident-sectie',
        views: {
          '': {
            templateUrl: 'rezident-sectie.html'
          }
        }
      })
      .state('home.domiciliat-corespondenta', {
        url: '/domiciliat-corespondenta',
        views: {
          '': {
            templateUrl: 'domiciliat-corespondenta.html'
          }
        }
      })
      .state('home.domiciliat-sectie', {
        url: '/domiciliat-sectie',
        views: {
          '': {
            templateUrl: 'domiciliat-sectie.html'
          }
        }
      })
      .state('community', {
        url: '/community',
        templateUrl: 'community.html',
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
