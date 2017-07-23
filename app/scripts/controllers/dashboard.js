'use strict';

/**
 * @ngdoc function
 * @name sampleAngularApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the sampleAngularApp
 */
angular.module('sampleAngularApp')
  .controller('DashboardCtrl', function (getProducts) {
  	
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.data = getProducts.data;
    //this.data = [{"name":"Apple","rPrice":"1","inc":"1"},{"name":"Apricots","rPrice":"5","inc":"2"},{"name":"Avocado","rPrice":"5","inc":"3"},{"name":"Banana","rPrice":"2","inc":"1"},{"name":"Blueberries","rPrice":"25","inc":"5"},{"name":"Cherries","rPrice":"25","inc":"4"},{"name":"Grape","rPrice":"10","inc":"2"},{"name":"Jackfruit","rPrice":"10","inc":"5"},{"name":"Dragon Fruit","rPrice":"2","inc":"0.5"},{"name":"Durian","rPrice":"10","inc":"2.5"}];
  });
