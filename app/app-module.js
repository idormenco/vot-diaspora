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
    // .config(function (uiGmapGoogleMapApiProvider) {
    //   uiGmapGoogleMapApiProvider.configure({
    //     key: 'AIzaSyCmgEeIhijJe689d_bpjPX9Sf1Bsm5fidU',
    //     v: '3.23',
    //     libraries: 'weather,geometry,visualization'
    //   });
    // })
    .controller('DiasporaCtrl', function ($scope, $state, uiGmapGoogleMapApi, locationsService) {
      var vm = this;
      vm.state = $state;
      vm.markers = [];

      uiGmapGoogleMapApi.then(function (maps) {
        maps.visualRefresh = true;
        vm.map = {
          center: {
            latitude: 16.943161,
            longitude: 24.96676
          },
          zoom: 3
        };

        // Load markers
        locationsService.getData()
          .then(function (response) {
            _.each(response, function (marker) {
              marker.id = marker.n;
              marker.coords = {latitude: marker.la, longitude: marker.lo};
              marker.templateUrl = 'marker.html';
              marker.texts = {
                m: marker.m,
                co: marker.co,
                description: marker.d,
                prefix: marker.prefi,
                adr: marker.a,
                fax: marker.fax,
                tel: marker.t,
                email: marker.em
              };
              console.log(marker);
              vm.markers.push(marker);
            });
          });
      });
    })
    .service('locationsService', function ($http) {
      this.getData = function () {
        return $http.get('locations.json')
          .then(function (response) {
            var filteredresponse = _.filter(response.data.markers, function (item) {
              return !_.isNull(item.field_support_gps_value);
            });
            console.log(filteredresponse);
            return filteredresponse;
          });
      };
    });
}());
