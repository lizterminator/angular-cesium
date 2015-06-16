angular.module('app')
  .controller('kmlCtrl', ['$scope','$rootScope','$modal','$aside','kmlService',
    function( $scope,$rootScope,$modal,$aside,kmlService ) {

      //KML
      //
      var kmlModal;//输入kml地址的模态框
      var rootEntities = [];//全部的entities
      var shownEntities = [];//显示的entities
      var kmlAside = undefined;//侧边面板
      var SHOW_KML_SIZE = 20;
      
      $scope.kmlUrl = "http://localhost:8081/KML/facilities/facilities.kml";
      $scope.loadKML = function(){

          var kmlUrl  = angular.element('#kmlUrl').val();

          $rootScope.viewer.dataSources.removeAll();
          var source = new Cesium.KmlDataSource();
          $rootScope.viewer.dataSources.add(source.load(kmlUrl)).then(function(){
            kmlService.add(source);

            rootEntities = kmlService.getEntities(0);
            $rootScope.shownEntities = kmlService.getEntities(0,SHOW_KML_SIZE);
            $scope.kmlSize = kmlService.size();
          });
          
          kmlModal.hide();
        };

      $scope.showKMLPanel = function(){

          if(kmlModal){
            kmlModal.show();
          }else{
            kmlModal = $modal({
              scope: $scope, 
              template: 'tpl/kmlSelectModal.html',
              show: true
            });
          }
      }

      $scope.removeKML = function(){
        kmlService.removeAll();
        $rootScope.viewer.dataSources.removeAll();
        $rootScope.shownEntities = [];
        rootEntities = [];
        $scope.kmlSize = 0;
      }

      
      $scope.listKML = function(){
        
        if(kmlAside){
          kmlAside.show();
        }else{
          kmlAside = $aside({
            scope: $scope, 
            template: 'tpl/kmlAside.html',
            show: true
          });
        }
        
      }
      $scope.entitySearch = function(){
        var keyword = angular.element('#entityKeyword').val().trim().toLowerCase();
        $rootScope.shownEntities = [];
        for(var i = 0,l = rootEntities.length;i<l;i++){
          if( rootEntities[i].name.toLowerCase().indexOf(keyword) >= 0){
            $rootScope.shownEntities.push(rootEntities[i]);
          }
          if($rootScope.shownEntities.length === SHOW_KML_SIZE){
            break;
          }
        }
      }

      $scope.chooseEntity = function(index){
        var entity = $rootScope.shownEntities[index];
        $rootScope.viewer.flyTo(entity);
        kmlAside.hide();
        console.log(entity.description);
      }
    }]);



