'use strict';

/**
 * @ngdoc service
 * @name sampleAngularApp.websocket
 * @description
 * # websocket
 * Factory in the sampleAngularApp.
 */
angular.module('sampleAngularApp')
.factory('socket', [function() {
    var stack = [];
    var onmessageDefer;
    var socket;
    var wsConnect = function(){
     socket = {
            ws: new WebSocket('ws:localhost:5000/ws'),
            openconnection: function(){
              if (socket.ws.readyState !== 1) {
                wsConnect();
              }
            },
            send: function(data) {
                data = JSON.stringify(data);
                if (socket.ws.readyState == 1) {
                    socket.ws.send(data);
                } else {
                    stack.push(data);
                }
            },
            onmessage: function(callback) {
                if (socket.ws.readyState == 1) {
                    socket.ws.onmessage = callback;
                } else {
                    onmessageDefer = callback;
                }
            },
             closeconnection: function(){
               socket.ws.close();
             }
        };
        socket.ws.onopen = function(event) {
            for (i in stack) {
                socket.ws.send(stack[i]);
            }
            stack = [];
            if (onmessageDefer) {
                socket.ws.onmessage = onmessageDefer;
                onmessageDefer = null;
            }
        };
        
    }
     wsConnect();
     return socket;
}]);
