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
    var socket = {
        ws: new WebSocket('ws:localhost:5000/ws'),
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
    return socket;
}])
  .factory('websocket', function () {
    // Service logic
    // ...
   var dataStream = new WebSocket('ws:localhost:5000/ws');

      var collection = [];

      dataStream.onmessage = function(message) {
        collection.push(JSON.parse(message.data));
      };

      var methods = {
        collection: collection,
        get: function() {
         // dataStream.send(JSON.stringify({ action: 'get' }));
        }
      };

      return methods;
  });
