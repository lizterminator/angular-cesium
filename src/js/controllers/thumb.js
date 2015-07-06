angular.module('app')
  .controller('thumbCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {


      //热点坐标
      $scope.hotspots = [{
        lon: 140,
        lat: 40,
        des: "一个点"
      }, {
        lon: 110,
        lat: 35,
        des: "另一个点"
      }, {
        lon: 90.5,
        lat: 0,
        des: "click me~"
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
      function setPositions() {
        for (var i = $scope.hotspots.length - 1; i >= 0; i--) {
          $scope.hotspots[i].left = 20 + ($scope.hotspots[i].lon - config.west) * pixelPerLon;
          $scope.hotspots[i].bottom = 20 + ($scope.hotspots[i].lat - config.south) * PixelPerLat;
          $scope.hotspots[i].height = mapHeight;
        };
      }

      setPositions();
      //视点切换函数,之后要的做就是把height作为当前的
      $scope.fly = function(index) {
        var p = $scope.hotspots[index];
        //var height = ($rootScope.viewer.camera.frustum.right - $rootScope.viewer.camera.frustum.left) * 0.5;
        $rootScope.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.height),
          duration: 0
        });
      }


      $scope.rotate = "rotate(90deg)";
      // console.log($rootScope.viewer.camera.direction);

      // var helper = new Cesium.EventHelper();
      // helper.add(Cesium.CameraEventType,function(){
      //   console.log('xxx');
      // },this);


      /*(function tick() {
         console.log($rootScope.viewer.camera._positionCartographic.longitude);

         Cesium.requestAnimationFrame(tick);
      })();*/

      //console.log($rootScope.viewer.camera);

      //console.log($rootScope.viewer.camera._positionCartographic.longitude);
      //


      //需要增加一个热点类,缩略图类的实例包含多个热点实例

      var tn = new Thumbnail();

      $scope.t_show = true;
      $scope.toggle = function() {

        $('#thumb').toggle();
        tn.toggle();
      }
      $scope.addHotspot = function() {
        console.log($scope.hotspots);
      }



      //tn.hide();

    }
  ]);