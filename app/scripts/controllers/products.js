'use strict';

/**
 * @ngdoc function
 * @name sampleAngularApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the sampleAngularApp
 */
angular.module('sampleAngularApp')
  .controller('ProductsCtrl', function (getProductsDetails,remoteCall) {
  	this.model = getProductsDetails.data;
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
