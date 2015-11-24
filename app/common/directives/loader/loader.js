(function () {
  'use strict';
  var loader = function () {
    return {
      restrict: 'EAC',
      templateUrl: 'app/common/directives/loader/loader.html'
    };
  };

  loader.$inject = ['$http'];
  angular.module('frontendApp').directive('loader', loader);
}());
