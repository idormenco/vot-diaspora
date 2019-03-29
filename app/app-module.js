(function () {
  'use strict';

// fixes broken iphone autocomplete field for location searching
// https://forum.ionicframework.com/t/google-maps-address-autocomplete-inside-slide-box/5278/25
  $(document).on({
    DOMNodeInserted: function () {
      $('.pac-item, .pac-item span', this).addClass('needsclick');
    }
  }, '.pac-container');

  /* @ngdoc object
   * @name votDiaspora
   * @description
   *
   */
  angular
    .module('votDiaspora', [
      'ui.router',
      'uiGmapgoogle-maps',
      'duScroll',
      '720kb.socialshare',
      'ezfb'
    ])
    .config(function (ezfbProvider) {
      ezfbProvider.setInitParams({
        appId: '319583755047031',
        version: 'v2.7'
      });
    })
    .controller('DiasporaCtrl', function ($scope, $state, $document, $timeout, uiGmapGoogleMapApi, locationsService) {
      var vm = this,
          // functions
          prepareMarkers;

      // all markers for the map
      vm.markers = [];
      vm.selectedMarker = null;
      vm.selectedLocation = null;
      vm.countries = {
        Albania: 'Albania',
        Algeria: 'Algeria',
        Argentina: 'Argentina',
        Angola: 'Angola',
        Armenia: 'Armenia',
        Australia: 'Australia',
        Austria: 'Austria',
        Azerbaijan: 'Azerbaidjan',
        Belarus: 'Belarus',
        Belgium: 'Belgia',
        Brazil: 'Brazilia',
        'Bosnia and Herzegovina': 'Bosnia-herţegovina',
        Bulgaria: 'Bulgaria',
        Canada: 'Canada',
        Chile: 'Chile',
        China: 'China',
        Colombia: 'Columbia',
        Croatia: 'Croaţia',
        Cuba: 'Cuba',
        Cyprus: 'Cipru',
        'Czech Republic': 'Rep. Cehă',
        Denmark: 'Danemarca',
        Ecuador: 'Ecuador',
        Egypt: 'Egipt',
        Ethiopia: 'Etiopia',
        Finland: 'Finlanda',
        France: 'Franţa',
        Georgia: 'Georgia',
        Germany: 'Germania',
        Greece: 'Grecia',
        Honduras: 'Honduras',
        Hungary: 'Ungaria',
        India: 'India',
        Indonesia: 'Indonezia',
        Iran: 'Iran',
        Iraq: 'Irak',
        Ireland: 'Irlanda',
        Israel: 'Israel',
        Italy: 'Italia',
        Japan: 'Japonia',
        Jordan: 'Iordania',
        Kazakhstan: 'Kazakhstan',
        Kenya: 'Kenya',
        Kuwait: 'Kuwait',
        Lebanon: 'Liban',
        Libya: 'Libia',
        Lithuania: 'Lituania',
        Luxembourg: 'Luxemburg',
        'Macedonia (FYROM)': 'Macedonia',
        Malaysia: 'Malaysia',
        Mexico: 'Mexic',
        Moldova: 'Rep. Moldova',
        Montenegro: 'Muntenegru',
        Morocco: 'Maroc',
        Netherlands: 'Olanda',
        Nigeria: 'Nigeria',
        'North Korea': 'Coreea De Nord',
        Norway: 'Norvegia',
        Pakistan: 'Pakistan',
        Palestine: 'Palestina',
        Peru: 'Peru',
        Philippines: 'Filipine',
        Poland: 'Polonia',
        Portugal: 'Portugalia',
        Qatar: 'Qatar',
        Russia: 'Federaţia Rusă',
        'San Marino': 'San Marino',
        'Saudi Arabia': 'Arabia Saudită',
        Senegal: 'Senegal',
        Serbia: 'Serbia',
        Singapore: 'Singapore',
        Slovakia: 'Slovacia',
        Slovenia: 'Slovenia',
        Spain: 'Spania',
        'Sri Lanka': 'Sri Lanka',
        'South Africa': 'Africa De Sud',
        'South Korea': 'Coreea De Sud',
        Sudan: 'Sudan',
        Sweden: 'Suedia',
        Switzerland: 'Elveţia',
        Syria: 'Siria',
        Thailand: 'Thailanda',
        Tunisia: 'Tunisia',
        Turkey: 'Turcia',
        Turkmenistan: 'Turkmenistan',
        Ukraine: 'Ucraina',
        'United Arab Emirates': 'Emiratele Arabe Unite',
        'United Kingdom': 'Marea Britanie',
        'United States': 'Sua',
        Uruguay: 'Uruguay',
        Uzbekistan: 'Uzbekistan',
        Vatican: 'Sfântul Scaun',
        Venezuela: 'Venezuela',
        Vietnam: 'Vietnam',
        Zimbabwe: 'Zimbabwe'
      };

      vm.exceptions = {
        Andorra: 3189,
        'Antigua and Barbuda': 3243,
        Bahrain: 3160,
        Barbados: 3243,
        Bangladesh: 3192,
        Belize: 3212,
        Benin: 3215,
        Bhutan: 3192,
        Bolivia: 3218,
        Botswana: 3155,
        Brunei: 3209,
        'Burkina Faso': 3223,
        Burundi: 3202,
        Cambodia: 3244,
        Cameroon: 3215,
        'Cape Verde': 3223,
        'Central African Republic': 3232,
        Chad: 3205,
        Comoros: 3155,
        'Costa Rica': 3212,
        'Côte d\'Ivoire': 3223,
        Djibouti: 3182,
        Dominica: 3243,
        'Dominican Republic': 3176,
        Ecuador: 3218,
        'El Salvador': 3212,
        'Equatorial Guinea': 3215,
        Eritrea: 3182,
        'Federated States of Micronesia': 3163,
        Fiji: 3163,
        Gabon: 3215,
        Ghana: 3215,
        Grenada: 3243,
        Guatemala: 3212,
        Guinea: 3223,
        'Guinea-Bissau': 3223,
        Guyana: 3243,
        Haiti: 3180,
        Honduras: 3212,
        Iceland: 3181,
        Jamaica: 3180,
        Kyrgyzstan: 3201,
        Kiribati: 3163,
        Laos: 3234,
        Lesotho: 3155,
        Liberia: 3215,
        Madagascar: 3155,
        Malawi: 3245,
        Maldives: 3192,
        Mali: 3223,
        Malta: 3199,
        'Marshall Islands': 3187,
        Mauritania: 3211,
        Mauritius: 3155,
        Monaco: 3189,
        Mongolia: 3174,
        Mozambique: 3155,
        'Myanmar (Burma)': 3234,
        Namibia: 3155,
        Nauru: 3163,
        'New Zealand': 3163,
        Nicaragua: 3212,
        Niger: 3215,
        Oman: 3185,
        Palau: 3187,
        Panama: 3176,
        'Papua New Guinea': 3193,
        Paraguay: 3161,
        'Republic of the Congo': 3159,
        Rwanda: 3202,
        'San Marino': 3199,
        'Saint Kitts and Nevis': 3243,
        'Saint Lucia': 3243,
        Samoa: 3163,
        'São Tomé and Príncipe': 3159,
        Seychelles: 3155,
        'Sierra Leone': 3215,
        'Solomon Islands': 3163,
        Somalia: 3232,
        'South Sudan': 3232,
        Suriname: 3243,
        'St Vincent and the Grenadines': 3243,
        Swaziland: 3155,
        Tajikistan: 3201,
        Tanzania: 3202,
        'Timor-Leste': 3193,
        'The Bahamas': 3243,
        'The Gambia': 3223,
        Tonga: 3163,
        Togo: 3215,
        'Trinidad and Tobago': 3243,
        Tuvalu: 3163,
        Uganda: 3202,
        Vanuatu: 3163,
        Yemen: 3185,
        Zambia: 3155
      };

      // interaction steps
      vm.debugSteps = 0;
      vm.step = {
        1: {
          visible: true
        },
        2: {
          visible: false,
          choice: null,
          firstChoice: null,
          secondChoice: null
        },
        3: {
          visible: false,
          choice: null
        },
        4: {
          visible: false,
          choice: null
        },
        5: {
          visible: false,
          choice: null
        }
      };

      vm.activateStep = function (step) {
        vm.step[step].visible = true;
        if (step === 2) {
          $timeout(function () {
            $document.scrollToElementAnimated(angular.element('.step-user-type'));
          }, 100);
        }
        if (step === 3) {
          $timeout(function () {
            $document.scrollToElementAnimated(angular.element('.step-user-vote'));
          }, 100);
        }
        if (step === 4) {
          $timeout(function () {
            $document.scrollToElementAnimated(angular.element('.step-user-action'));
          }, 100);
        }
        if (step === 5) {
          $timeout(function () {
            $document.scrollToElementAnimated(angular.element('.step-user-final'));
          }, 100);
        }
      };
      vm.stepChoice = function (step, choice) {
        vm.step[step].firstChoice = choice === 1 ? 'chosen' : 'faded';
        vm.step[step].secondChoice = choice === 2 ? 'chosen' : 'faded';
        vm.step[step].choice = choice;
      };

      $scope.$watch(function () {
        return !_.isNull(vm.step['2'].choice) && !_.isNull(vm.step['3'].choice) ? vm.step['2'].choice.toString() + vm.step['3'].choice.toString() : null;
      }, function (value) {
        switch (value) {
          case '11':
            $state.go('home.rezident-corespondenta');
            break;
          case '12':
            $state.go('home.rezident-sectie');
            break;
          case '21':
            $state.go('home.domiciliat-corespondenta');
            break;
          case '22':
            $state.go('home.domiciliat-sectie');
            break;
          default:
            break;
        }
      });

      vm.city = {
        exception: false,
        // city name as autocompleted by Google Places
        name: null,
        // the whole response received from Google Places
        details: null,
        // markers found around the searched city
        markers: [],
        // search google places only for city names
        options: {
          types: '(cities)'
        }
      };

      // reset user search
      vm.cityReset = function () {
        vm.city.exception = false;
        vm.city.name = vm.city.details = null;
        vm.city.markers = [];
      };

      // watch city details, to launch the map reposition and the finding of closest markers
      $scope.$watch(function () {
        return vm.city.details;
      }, function (details) {
        var point,
            bounds,
            countryEN,
            countryRO,
            marker,
            localPoint,
            distance,
            selected
            ;
        if (_.isNull(details)) {
          vm.city.markers = [];
          return;
        }
        point = new GeoPoint(details.geometry.location.lat(), details.geometry.location.lng(), false);
        countryEN = _.filter(details.address_components, function (loc) {
          return !loc.types.indexOf('country');
        })[0].long_name;
        countryRO = vm.countries[countryEN];

        bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(details.geometry.location.lat(), details.geometry.location.lng()));

        vm.city.markers = [];

        vm.city.exception = angular.isDefined(vm.exceptions[countryEN]);
        if (vm.city.exception) {
          marker = _.find(vm.markers, {n: String(vm.exceptions[countryEN])});
          localPoint = new GeoPoint(marker.coords.latitude, marker.coords.longitude, false);
          distance = point.distanceTo(localPoint, true);
          selected = marker.texts;
          selected.distance = parseFloat((Math.round(distance * 2) / 2).toFixed(1));
          selected.id = marker.n;
          vm.city.markers.push(selected);
          bounds.extend(new google.maps.LatLng(marker.coords.latitude, marker.coords.longitude));
        } else {
          _.each(vm.markers, function (place) {
            var placePoint;
            placePoint = new GeoPoint(parseFloat(place.coords.latitude), parseFloat(place.coords.longitude), false);
            place.distance = point.distanceTo(placePoint, true);
          });

          _.each(_.sortBy(vm.markers, 'distance').splice(0, 6), function (place) {
            var selectedPlace;
            // if (place.co === countryRO) { // tara orasului cautat de user este acceasi cu tara in care se afla ambasada
            selectedPlace = place.texts;
            selectedPlace.distance = parseFloat((Math.round(place.distance * 2) / 2).toFixed(1));
            selectedPlace.id = place.n;
            vm.city.markers.push(selectedPlace);
            bounds.extend(new google.maps.LatLng(place.coords.latitude, place.coords.longitude));
            // }
          });
        }

        vm.map.bounds = {
          northeast: {
            latitude: bounds.getNorthEast().lat(),
            longitude: bounds.getNorthEast().lng()
          },
          southwest: {
            latitude: bounds.getSouthWest().lat(),
            longitude: bounds.getSouthWest().lng()
          }
        };
        if (!vm.city.markers.length) {
          vm.map.zoom = 14;
        }
      });

      prepareMarkers = function (response) {
        var temp = [];
        _.each(response, function (marker) {
          marker.id = marker.n;
          marker.showWindow = false;
          marker.coords = {latitude: marker.la, longitude: marker.lo};
          marker.templateUrl = 'markerWindow.html';
          marker.icon = 'images/pin.png';
          marker.texts = {
            title: marker.m,
            country: marker.co,
            adr: marker.a,
            tel: marker.t,
            email: marker.em
          };
          marker.onClicked = function (selected) {
            // console.log(selected.key);
            _.each(vm.markers, function (item) {
              var sameMarker = item.n === selected.key ? true : false;
              item.showWindow = sameMarker;
              if (sameMarker) {
                vm.selectedMarker = item;
              }
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

      vm.closeWindow = function () {
        vm.selectedMarker = null;
      };

      vm.isDevice = (/iphone|iod|android|(?=.*\bandroid\b)(?=.*\bmobile\b)|iemobile|(?=.*\bwindows\b)(?=.*\barm\b)|(crios|chrome)(?=.*\bmobile\b)|opera mini/i).test(navigator.userAgent.toLowerCase());

      uiGmapGoogleMapApi.then(function (maps) {
        maps.visualRefresh = true;
        vm.map = {
          center: {
            latitude: 16.943161,
            longitude: 24.96676
          },
          zoom: 3,
          options: {
            scrollwheel: false,
            draggable: !vm.isDevice
          }
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
    })
    .directive('locationBox', function () {
      return {
        restrict: 'AE',
        templateUrl: 'locationBox.html'
      };
    })
    .directive('ngAutocomplete', function () {
      return {
        require: 'ngModel',
        scope: {
          ngModel: '=',
          options: '=?',
          details: '=?'
        },

        link: function (scope, element, attrs, controller) {
          // options for autocomplete
          var opts,
              watchEnter = false,
              // convert options provided to opts
              initOpts,
              getPlace;

          initOpts = function () {
            opts = {};
            if (scope.options) {
              watchEnter = scope.options.watchEnter !== true ? false : true;
              if (scope.options.types) {
                opts.types = [];
                opts.types.push(scope.options.types);
                scope.gPlace.setTypes(opts.types);
              } else {
                scope.gPlace.setTypes([]);
              }

              if (scope.options.bounds) {
                opts.bounds = scope.options.bounds;
                scope.gPlace.setBounds(opts.bounds);
              } else {
                scope.gPlace.setBounds(null);
              }

              if (scope.options.country) {
                opts.componentRestrictions = {
                  country: scope.options.country
                };
                scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
              } else {
                scope.gPlace.setComponentRestrictions(null);
              }
            }
          };

          if (angular.isUndefined(scope.gPlace)) {
            scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
          }

          google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
            var result = scope.gPlace.getPlace();
            if (angular.isDefined(result)) {
              if (angular.isDefined(result.address_components)) {
                scope.$apply(function () {
                  scope.details = result;
                  controller.$setViewValue(element.val());
                });
              } else if (watchEnter) {
                getPlace(result);
              }
            }
          });

          // function to get retrieve the autocompletes first result using the AutocompleteService
          getPlace = function (result) {
            var autocompleteService = new google.maps.places.AutocompleteService();
            if (result.name.length > 0) {
              autocompleteService.getPlacePredictions(
                {
                  input: result.name,
                  offset: result.name.length
                },
              function listentoresult(list) {
                var placesService;
                if (list === null || list.length === 0) {
                  scope.$apply(function () {
                    scope.details = null;
                  });
                } else {
                  placesService = new google.maps.places.PlacesService(element[0]);
                  placesService.getDetails(
                    {reference: list[0].reference},
                    function detailsresult(detailsResult, placesServiceStatus) {
                      if (placesServiceStatus === google.maps.GeocoderStatus.OK) {
                        scope.$apply(function () {
                          // on focusout the value reverts, need to set it again.
                          element.on('focusout', function () {
                            element.val(detailsResult.formatted_address);
                            element.unbind('focusout');
                          });
                          controller.$setViewValue(detailsResult.formatted_address);
                          element.val(detailsResult.formatted_address);
                          scope.details = detailsResult;
                        });
                      }
                    }
                  );
                }
              });
            }
          };

          controller.$render = function () {
            var location = controller.$viewValue;
            element.val(location);
          };

          // watch options provided to directive
          scope.watchOptions = function () {
            return scope.options;
          };
          scope.$watch(scope.watchOptions, function () {
            initOpts();
          }, true);
        }
      };
    });
}());
