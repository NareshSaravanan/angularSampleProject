'use strict';

/**
 * @ngdoc function
 * @name sampleAngularApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the sampleAngularApp
 */
angular.module('sampleAngularApp')
  .controller('DashboardCtrl', function ($scope,socket,$uibModal) {
    socket.onmessage(function(event) {
        var data = JSON.parse(event.data);
        if(angular.isArray(data)){
            this.data = data;
            $scope.$apply();
          }else{
           this.data.find(function(obj){
              if(obj.name === data.name){
                obj.lastBid = data.lastBid;
              }
            });
            $scope.$apply();
          }
        //$scope.testVar = 
    }.bind(this));
    $scope.$on("$destroy", function(){
        socket.closeconnection();
    });
  $scope.$on('$viewContentLoaded', function readyToTrick() {
    debugger;
    socket.openconnection();
    // say hello to your new content here
    // BUT NEVER TOUCHES THE DOM FROM A CONTROLLER
  });
    this.openModel = function(){
            var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/login.html',
            controller: function($scope,$uibModalInstance,$window){
              this.login = function(){
                $window.localStorage.setItem("userName",this.userName);
                $uibModalInstance.close();
              }
            },
            controllerAs: '$ctrl',
            size: 'md',
          });

          modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
          }, function (data) {
            console.log(data);
          });
        };
    
    //this.data = [{"name":"Apple","rPrice":"1","inc":"1"},{"name":"Apricots","rPrice":"5","inc":"2"},{"name":"Avocado","rPrice":"5","inc":"3"},{"name":"Banana","rPrice":"2","inc":"1"},{"name":"Blueberries","rPrice":"25","inc":"5"},{"name":"Cherries","rPrice":"25","inc":"4"},{"name":"Grape","rPrice":"10","inc":"2"},{"name":"Jackfruit","rPrice":"10","inc":"5"},{"name":"Dragon Fruit","rPrice":"2","inc":"0.5"},{"name":"Durian","rPrice":"10","inc":"2.5"}];
  });
