angular.module('app')
  .controller('thumbCtl', ['$scope', '$rootScope',
    function($scope, $rootScope) {


      //热点坐标
      $scope.hotspots = [{
        lon: 140,
        lat: 40
      }, {
        lon: 110,
        lat: 35
      }, {
        lon: 90.5,
        lat: 0
      }];

      //图片的东南西北
      var config = {
        west: -180,
        south: -90,
        east: 180,
        north: 90
      };


      //缩略图的宽度、高度,跟Thumbnail.css中的需要一致
      var WIDTH = 400;
      var HEIGHT = 200;

      //切换视点时默认的高度（暂时这么做,之后需要实时获取当前的高度）
      var mapHeight = 1000000;

      var pixelPerLon = WIDTH / (config.east - config.west);
      var PixelPerLat = HEIGHT / (config.north - config.south);


      //设置热点的位置
      for (var i = $scope.hotspots.length - 1; i >= 0; i--) {
        $scope.hotspots[i].left = 20 + ($scope.hotspots[i].lon - config.west) * pixelPerLon;
        $scope.hotspots[i].bottom = 20 + ($scope.hotspots[i].lat - config.south) * PixelPerLat;
        $scope.hotspots[i].height = mapHeight;
      };


      //视点切换函数,之后要的做就是把height作为当前的
      $scope.fly = function(index) {
        var p = $scope.hotspots[index];
        //var height = ($rootScope.viewer.camera.frustum.right - $rootScope.viewer.camera.frustum.left) * 0.5;
        $rootScope.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.height)
        });
      }


      $scope.rotate = "rotate(90deg)";
      var t = $rootScope.viewer.camera.direction;
      console.log($rootScope.viewer.camera.direction);
      console.log($rootScope.viewer.camera.directionWC);
      console.log($rootScope.viewer.camera.worldToCameraCoordinatesPoint(t));
      //若要关闭功能,注释(1),打开(2)
      Thumbnail(); //(1)
      //$scope.hotspots = [];     //(2)

    }
  ]);