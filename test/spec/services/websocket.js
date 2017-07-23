'use strict';

describe('Service: websocket', function () {

  // load the service's module
  beforeEach(module('sampleAngularApp'));

  // instantiate service
  var websocket;
  beforeEach(inject(function (_websocket_) {
    websocket = _websocket_;
  }));

  it('should do something', function () {
    expect(!!websocket).toBe(true);
  });

});
