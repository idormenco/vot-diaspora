(function () {
  'use strict';

  angular
    .module('votDiaspora')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
