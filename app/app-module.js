(function () {
  'use strict';

  /* @ngdoc object
   * @name votDiaspora
   * @description
   *
   */
  angular
    .module('votDiaspora', [
      'ui.router',
      'mm.foundation',
      'uiGmapgoogle-maps'
      // 'ngStorage'
      // 'ngGeolocation'
      // 'angular-google-maps-geocoder'
    ])
    .config(function (uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCmgEeIhijJe689d_bpjPX9Sf1Bsm5fidU',
        v: '3.23',
        libraries: 'weather,geometry,visualization'
      });
    })
    .controller('DiasporaCtrl', function ($scope, $state, uiGmapGoogleMapApi) {
      var vm = this;
      vm.state = $state;

      uiGmapGoogleMapApi.then(function (maps) {
        maps.visualRefresh = true;
        vm.map = {
          center: {
            latitude: 0,
            longitude: 0
          },
          zoom: 3
        };
        console.log(vm);
      });
    });
}());
