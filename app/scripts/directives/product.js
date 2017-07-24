'use strict';

/**
 * @ngdoc directive
 * @name sampleAngularApp.directive:product
 * @description
 * # product
 */
angular.module('sampleAngularApp')
    .directive('product', function($http, $location, remoteCall,$rootScope) {
        return {
            templateUrl: 'views/product.html',
            restrict: 'E',
            scope: {
                model: '=',
                navigate: "="

            },
            link: function postLink(scope, element, attrs) {
                //scope.model = attrs.name;
                scope.updateBidObject = function() {
                    scope.minimumBid = scope.model.lastBid ? scope.model.lastBid.price + scope.model.inc : scope.model.rPrice;
                    scope.bidObject = {
                        user: $rootScope.userName,
                        price: scope.minimumBid
                    };
                };
                scope.updateBidObject();
                scope.addBid = function() {
                     
                    remoteCall.put('products/' + this.model.name + '/bid', {
                        user: $rootScope.userName,
                        price: this.bidObject.price
                    }).then(response => {
                        scope.model = response.data;
                        this.updateBidObject(scope);
                    });
                };
                scope.validataBid = function() {
                    var currentBid = scope.bidObject.price,
                        minimumBid = scope.minimumBid
                    if (!currentBid || currentBid < minimumBid) {
                        scope.error = "Invalid bid amout"
                    } else {
                        scope.error = null;
                    }
                };
                scope.navigateToBidPage = function() {
                    $location.path('/products/' + this.model.name);
                }
            }
        };
    });