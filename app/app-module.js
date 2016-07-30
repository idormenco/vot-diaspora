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
      var onMarkerClicked,
          vm = this;
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

        onMarkerClicked = function (marker) {
          _.each(vm.markers, function (item) {
            item.showWindow = item.id == marker.id ? true: false;
          });
          console.log(marker);
          $scope.$apply();
        };

        // Load markers
        locationsService.getData()
          .then(function (response) {
            var temp = [];
            _.each(response, function (marker) {
              marker.id = marker.n;
              marker.showWindow = false;
              marker.coords = {latitude: marker.la, longitude: marker.lo};
              marker.templateUrl = 'markerWindow.html';
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
              marker.onClicked = function () {
                onMarkerClicked(marker);
              };
              marker.closeClick = function () {
                marker.showWindow = false;
                $scope.$evalAsync();
              };
              temp.push(marker);
            });
            vm.markers = temp;
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
