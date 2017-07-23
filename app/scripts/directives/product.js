'use strict';

/**
 * @ngdoc directive
 * @name sampleAngularApp.directive:product
 * @description
 * # product
 */
angular.module('sampleAngularApp')
  .directive('product', function ($http,$location) {
    return {
      templateUrl: 'views/product.html',
      restrict: 'E',
       scope: {
	      model: '=',
	      navigate:"="
	   },
      link: function postLink(scope, element, attrs) {
        //scope.model = attrs.name;
        scope.bidObject = {};
		scope.addBid = function(){
		    $http.put('http://localhost:5000/api/products/'+this.model.name+'/bid',{
		      user : this.model.user || "syed",
		      price : this.bidObject.price
		    }).then(response => {
		          this.data = response.data;
		        });
		}
		scope.navigateToBidPage = function(){
		   $location.path('/products/'+ this.model.name);
		}
	   }
    };
  });
