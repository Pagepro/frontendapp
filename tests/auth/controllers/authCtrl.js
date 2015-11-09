'use strict';

describe('AuthCtrl', function() {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    console.log($rootScope);
    this.AuthCtrl = $controller('AuthCtrl', {
      $scope: scope
    });
  }));

  it('should have value of 1', function() {
    expect(scope.test).toBe(1);
  });
});
