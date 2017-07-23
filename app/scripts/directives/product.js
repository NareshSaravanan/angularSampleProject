'use strict';

/**
 * @ngdoc directive
 * @name sampleAngularApp.directive:product
 * @description
 * # product
 */
angular.module('sampleAngularApp')
  .directive('product', function ($http,$location, remoteCall) {
    return {
      templateUrl: 'views/product.html',
      restrict: 'E',
       scope: {
	      model: '=',
	      navigate:"="
	   },
      link: function postLink(scope, element, attrs) {
				//scope.model = attrs.name;
				scope.minimumBid = scope.model.lastBid ? scope.model.lastBid.price + scope.model.inc : scope.model.rPrice;
        scope.bidObject = {
						user : scope.model.user || "user",
						price : scope.minimumBid
				};
				scope.addBid = function(){
						remoteCall.put('products/' + this.model.name + '/bid',{
									user : this.model.user || "syed",
									price : this.bidObject.price
						}).then(response => {
									this.data = response.data;
						});
				}
				scope.validataBid = function () {
						var currentBid = scope.bidObject.price, minimumBid = scope.minimumBid
						if(!currentBid || currentBid < minimumBid) {
								scope.error = "Invalid bid amout"
						} else {
								scope.error = null;
						}
				}
				scope.navigateToBidPage = function(){
					$location.path('/products/'+ this.model.name);
				}
	   }
    };
  });
