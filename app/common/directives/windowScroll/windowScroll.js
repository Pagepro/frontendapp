(function() {
  'use strict';
  var windowScroll = function($window) {
    return {
      link: function(scope, element, attrs) {
        var prevDistance;

        angular.element($window).bind('scroll', function() {
          var distance = this.pageYOffset;

          if (distance >= 25) {
            scope.scrollClass = 'small';
          } else {
            scope.scrollClass = '';
          }
          if (distance > 50) {
            if (prevDistance > distance) {
            // if scrolling up
              scope.scrollClass += ' small';
            } else {
            // if scrolling down
              scope.scrollClass += ' hidden';
            }
          } else {
            scope.scrollClass = '';
          }
          prevDistance = distance;

          scope.$apply();
        });
      }
    };
  };

  windowScroll.$inject = ['$window'];

  angular.module('frontendApp').directive('windowScroll', windowScroll);
}());
