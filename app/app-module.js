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
    ])
    .controller('DiasporaCtrl', function ($scope, $state, uiGmapGoogleMapApi, locationsService) {
      var vm = this,
          prepareMarkers;
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

        prepareMarkers = function (response) {
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
              _.each(vm.markers, function (item) {
                item.showWindow = item.id === marker.id ? true : false;
              });
              $scope.$apply();
            };
            marker.closeClick = function () {
              marker.showWindow = false;
              $scope.$evalAsync();
            };
            marker.onWindowClose = function () {
              marker.showWindow = false;
              $scope.$evalAsync();
            };
            temp.push(marker);
          });
          // vm.markers = temp.splice(0, 3);
          vm.markers = temp;
        };

        // Load markers
        locationsService.getData()
          .then(function (response) {
            prepareMarkers(response);
          });
      });
    })
    .service('locationsService', function ($http) {
      this.getData = function () {
        return $http.get('locations.json')
          .then(function (response) {
            var filteredresponse = _.filter(response.data.markers, function (item) {
              return !_.isNull(item.la) && !_.isNull(item.lo);
            });
            return filteredresponse;
          });
      };
    });
}());
