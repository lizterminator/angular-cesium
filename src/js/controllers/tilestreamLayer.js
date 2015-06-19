angular.module('app')
  .controller('tilestreamCtrl', ['$scope','$rootScope','$modal','layerManager','requestService','urlService',
    function( $scope,$rootScope,$modal,layerManager,requestService,urlService) {

    	requestService.getLayers($scope);
    	//加载&&卸载图层
      $scope.toggleLayer = function(index){
        var layer = $scope.layers[index];
        var layerName = layer.name;
        var schemaType = layer.schemaType;

        var loadedLayer = layerManager.getLayer(layerName);
        if(layer.loaded){
          //已经加载，在此卸载
          if(loadedLayer){
            $rootScope.imageryLayers.remove(loadedLayer);
            layerManager.addLayer(layerName,null);
          }      
          $scope.layers[index].tip = '未加载';

        }else{
            if(!loadedLayer){
              var layer = new Cesium.ImageryLayer(
                new Cesium.TileXYZImageryProvider({
                  //url: "http://192.168.3.98:8888/v2/"+layerName+"/{z}/{x}/{y}.png",
                  url: urlService.tileStreamTileUrl.replace('{layerName}',layerName),
                  projectionType: schemaType==="SCHEMA_MERCATOR"?"Mercator":"GEO",
                  maximumLevel: 13,
                  minimumLevel: 8
                }));

              $rootScope.imageryLayers.add(layer);
              layerManager.addLayer(layerName,layer);
            }
            
          
          $scope.layers[index].tip = '已加载';
        }

        $scope.layers[index].loaded = !$scope.layers[index].loaded;
      }

      $scope.moveViewToLayer = function(index){
        var layer = $scope.layers[index];
        var bounds = layer.bounds;
        $rootScope.viewer.camera.flyTo({
          destination : Cesium.Rectangle.fromDegrees(bounds[0], bounds[1], bounds[2], bounds[3])
        });
      }

      $scope.showMetadata = function(index){
        var metaData = $scope.metaData = $scope.layers[index];
        $scope.metaDataJson = JSON.stringify(metaData,null,4);
        var metaDataModal = $modal({scope: $scope, template: 'tpl/metaDataModal.html', show: true});
     
      }
    }]);