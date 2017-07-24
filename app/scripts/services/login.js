'use strict';

/**
 * @ngdoc service
 * @name sampleAngularApp.login
 * @description
 * # login
 * Service in the sampleAngularApp.
 */
angular.module('sampleAngularApp')
  .service('login', function ($uibModal,$window,$rootScope,$location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var openModel = function(){
            var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/login.html',
            controller: function($scope,$uibModalInstance,$window,$rootScope){
              this.login = function(){
                $window.localStorage.setItem("userName",this.userName);
                $rootScope.userName = this.userName;
                $uibModalInstance.close();
              }
            },
            controllerAs: '$ctrl',
            size: 'md',
          });

          modalInstance.result.then(function (selectedItem) {
           // dss $ctrl.selected = selectedItem;
          }, function (data) {
            console.log(data);
          });
        };
      var logout = function(){
      	 $window.localStorage.removeItem("userName");
         $rootScope.userName = null;
         $location.path('/dashboard');
      }
        return {
        	openModel : openModel,
        	logout : logout
        }
  });
