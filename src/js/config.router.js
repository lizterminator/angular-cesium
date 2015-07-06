'use strict';

/**
 * Config for the router
 */


angular.module('app')
  .service('urlService', function($rootScope,$http) {

    $.ajax({
      url: "../config/config.json",
      method: 'GET',
      dataType: 'json',
      async: false
    })
    .success(function(data){
      // console.log(data);
      $rootScope.appConfig = data;
      
    }).error(function(){
      alert('请检查配置文件 config->config.json');
    });

    var config = $rootScope.appConfig;
    this.tileStreamTileUrl = config.tileStreamTileUrl;
    this.tileStreamLayerUrl = config.tileStreamLayerUrl;
    this.defaultSituationUrl = config.defaultSituationUrl;
    this.defaultHotspotsUrl = config.defaultHotspotsUrl;
    
    this.config = function(key,value){
      this[key] = value;
    }
    //console.log(that,this);
    //请求瓦片的url
    //this.tileStreamTileUrl = "http://localhost:8888/v2/{layerName}/{z}/{x}/{y}.png";
    //请求所有图层,图层元数据的url
    // this.tileStreamLayerUrl = "http://localhost:8888/api/";
  })
  .service('requestService', function($http, urlService) {
    var baseUrl = urlService.tileStreamLayerUrl;
    this.getLayers = function($scope) {
      var url = baseUrl + "Tileset";
      $http.get(url).
      success(function(data, status, headers, config) {
        $scope.layers = data;

      }).error(function(){
        $scope.layers = [];
      });
    };

    this.getMetaData = function($scope, layerName) {
      var url = baseUrl + "Tileset/" + layerName;
      $http.get(url).
      success(function(data, status, headers, config) {

        console.log(data);

      });
    };
  })
  .service('situationService', function() {
    var dataSource = null;
    this.add = function(source) {
      dataSource = source;
    }
    this.show = function() {
      console.log(dataSource.entities.values);
    }
    this.removeAll = function() {
      dataSource = null;
    }
    this.size = function() {
      return dataSource.entities.values.length;
    }
    this.getEntities = function(start, end) {
      return dataSource.entities.values.slice(start, end);;
    }
  })
  .service('layerManager', function() {

    var loadedLayers = [];

    this.addLayer = function(layerName, layer) {
      loadedLayers[layerName] = layer;
    }
    this.getLayer = function(layerName) {
      return loadedLayers[layerName];
    }
    this.size = function() {
      return loadedLayers.length;
    }
  })


angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
          .otherwise('/app/map/114/30/10000000'); //默认经纬度，高度
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'tpl/app.html'
          })
          .state('app.map', {
            url: '/map/:lon/:lat/:height',
            templateUrl: 'tpl/map.html',
            reloadOnSearch: false,
            controller: function($scope, $rootScope, $state, $stateParams, $urlMatcherFactory, $location) {


              var viewer = $rootScope.viewer = new Cesium.Viewer('map', {
                baseLayerPicker: false,
                timeline: false,
                navigationHelpButton: false,
                geocoder: true,
                animation: false,
                sceneMode:Cesium.SceneMode.SCENE3D
              });
              $('.cesium-infoBox-title').addClass('text-danger text-md');
              $rootScope.imageryLayers = viewer.scene.imageryLayers;
              $rootScope.imageryLayers.removeAll();
              //浏览器地址变化时，定位到相应地经纬度
              $scope.$on('$locationChangeSuccess', function(event) {
                var urlMatcher = $urlMatcherFactory.compile("/app/map/:lon/:lat/:height");
                var matched = urlMatcher.exec($location.url());
                var lon = matched.lon;
                var lat = matched.lat;
                var height = parseFloat(matched.height);
                $rootScope.viewer.camera.flyTo({
                  destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
                  duration: 0
                });

              });

              var lon = $stateParams.lon;
              var lat = $stateParams.lat;
              var height = parseFloat($stateParams.height);
              viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
                duration: 0
              });
            }
          })


      }
    ]
  );