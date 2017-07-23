'use strict';

/**
 * @ngdoc service
 * @name sampleAngularApp.remoteCall
 * @description
 * # remoteCall
 * Service in the sampleAngularApp.
 */
angular.module('sampleAngularApp')
  .service('remoteCall', function ($q, $http, $rootScope, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //  var endpointUrl = '//172.16.0.35/api';
    var endpointUrl = 'http://localhost:5000/api/';
    var isTimedOut = false,timeout = 5000;
    var promise = null;
       var idlePromise = null;
       var sendRequest = function sendRequest(method,url,  dataObj) {
           if (promise !== null) $timeout.cancel(promise);
           promise = $timeout(function() {
              isTimedOut = true;
              console.log('timeout :: ',isTimedOut);
           }, timeout * 1000);

           if (idlePromise !== null) $timeout.cancel(idlePromise);
           idlePromise = $timeout(function() {
               $rootScope.idlePrompt();
           }, ((timeout)*1000)-1000);
          var deferred = $q.defer();
        deferred.resolve($http({
          method : method,
          url : endpointUrl + url,
          data : dataObj
          //headers: dataObj.headers
          //  headers: dataObj.headers //should be stored in this file, not passed in
        }).then(function(result) {
            isTimedOut = false;
            //Adding Common error mesasge to show the error code in all error response. Adding as per instruction given .
            try {
                if(angular.isDefined(result)) {
                    if (angular.isDefined(result) && angular.isDefined(result.errorObj) && angular.isDefined(result.errorObj.errorCd) && angular.isDefined(result.errorObj.errorDesc)) {
                        var customErrorMsg = 'Error: ' + result.errorObj.errorCd + ' - ' + result.errorObj.errorDesc;
                        result.errorObj.errorDesc = customErrorMsg
                    }

                    else if (angular.isDefined(result.data) && angular.isDefined(result.data.errorObj) && angular.isDefined(result.data.errorObj.errorCd) && angular.isDefined(result.data.errorObj.errorDesc)) {
                        var customErrorMsg = 'Error: ' + result.data.errorObj.errorCd + ' - ' + result.data.errorObj.errorDesc;
                        result.data.errorObj.errorDesc = customErrorMsg
                    }
                }
            } catch(e) {
                console.log('exception');
                console.log(result);
            }
            return result;

        },function(error,status){
            console.log('Timeout error message Start');
            console.log('status: ',status);
            console.log('error: ',error);
            console.log('Timeout error message End');
            console.log('timeout ',timeout);
            console.log('isTimedOut ',isTimedOut);
            loadingService.isLoading(false);
            if (isTimedOut) {
                window.location.href = logoutUrl;
            }else{
                isTimedOut = false;
            }
        }));
        return deferred.promise;

      };
      return {
        get: function(url, dataObj) {

          return sendRequest('GET', url,  dataObj);
        },
        post: function(url, dataObj) {

          return sendRequest('POST',url,  dataObj);
        },   
        put: function(url, dataObj) {

          return sendRequest('PUT',url,  dataObj);
        }
      };
  });
