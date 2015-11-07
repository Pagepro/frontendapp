(function() {
  'use strict';
  var windowScroll = function($window) {
    return {
      link: function(scope, element, attrs) {
        angular.element($window).bind('scroll', function() {
          console.log('dummy-text');
          scope.$apply();
        });
      }
    };
  };

  windowScroll.$inject = ['$window'];

  angular.module('frontendApp').directive('windowScroll', windowScroll);
}());
