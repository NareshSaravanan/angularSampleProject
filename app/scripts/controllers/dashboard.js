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
    socket.openconnection();
  });
 });
