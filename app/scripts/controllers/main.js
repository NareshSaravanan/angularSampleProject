'use strict';

/**
 * @ngdoc function
 * @name sampleAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAngularApp
 */
angular.module('sampleAngularApp')
  .controller('MainCtrl', function ($scope,$rootScope,login) {
    $scope.isuserLoggedIn = function(){
    	var userName = $rootScope.userName;
    	if(userName){
    		return userName;
    	}

    	return false;
    }
    $scope.logout = function(){
        login.logout();
    }
    $scope.$watch('$root.userName', function(newNames, oldNames) {
	 	$scope.value = $scope.isuserLoggedIn();
	});
  });
