'use strict';

/**
 * @ngdoc overview
 * @name sampleAngularApp
 * @description
 * # sampleAngularApp
 *
 * Main module of the application.
 */
angular
  .module('sampleAngularApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/products/:productName', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products',
        resolve:{
          getProductsDetails : function($route,remoteCall){
            return remoteCall.get('products/'+$route.current.pathParams.productName);
            //return $http.get('http://localhost:5000/api/products/'+$route.current.pathParams.productName);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.hashPrefix('');
  });
