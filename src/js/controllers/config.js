angular.module('app')
  .controller('configCtrl', ['$scope', '$rootScope', '$modal', '$aside','urlService',
    function($scope, $rootScope, $modal, $aside, urlService) {

      //situation
      var situationModal; //输入kml地址的模态框
      

     
      $scope.showConfigPanel = function() {

        if (situationModal) {
          situationModal.show();
        } else {
          situationModal = $modal({
            scope: $scope,
            template: 'tpl/configModal.html',
            show: true
          });
        }
      }

      $scope.saveConfig = function(){

      }
      
    }
  ]);