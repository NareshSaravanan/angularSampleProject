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
    'ngRoute','ui.bootstrap'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        authentication:false
      })
      .when('/products/:productName', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products',
        authentication:true,
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
  })
   .run( function($rootScope, $location,$window,login) {

    // register listener to watch route changes
    $rootScope.userName = $window.localStorage.getItem("userName");
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if(next.$$route && next.$$route.authentication){
          var userName = $window.localStorage.getItem("userName");
          if(!userName){
            $rootScope.userName = null;
            event.preventDefault();
            login.openModel(event);
            $location.path("/dashboard");
          }else{
            $rootScope.userName = userName;
          }
      }        
    });
  })
