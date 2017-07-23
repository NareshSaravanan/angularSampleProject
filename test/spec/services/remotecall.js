'use strict';

describe('Service: remoteCall', function () {

  // load the service's module
  beforeEach(module('sampleAngularApp'));

  // instantiate service
  var remoteCall;
  beforeEach(inject(function (_remoteCall_) {
    remoteCall = _remoteCall_;
  }));

  it('should do something', function () {
    expect(!!remoteCall).toBe(true);
  });

});
