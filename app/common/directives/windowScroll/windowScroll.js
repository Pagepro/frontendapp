(function() {
  'use strict';
  var windowScroll = function($window) {
    return {
      link: function(scope, element, attrs) {

        angular.element($window).bind('scroll', function() {
          var distance = this.pageYOffset;

          if (distance >= 25) {
            scope.scrollClass = 'small';
          } else {
            scope.scrollClass = '';
          }
          if (distance > 50) {
            scope.scrollClass += ' hidden';
          } else {
            scope.scrollClass = '';
          }

          scope.$apply();
        });
      }
    };
  };

  windowScroll.$inject = ['$window'];

  angular.module('frontendApp').directive('windowScroll', windowScroll);
}());
