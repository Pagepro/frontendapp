(function() {
  'use strict';
  var headerSection = function($window) {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/header/headerSection.html',
      link: function(scope) {
        scope.menuVisible = false;
        scope.toggleMenu = function() {
          scope.menuVisible = !scope.menuVisible;
        };
        scope.hideMenu = function() {
          scope.menuVisible = false;
        };
        scope.logout = function() {
          scope.hideMenu();
          $window.localStorage.removeItem('token');
        };
      }
    };
  };

  headerSection.$inject = ['$window'];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());
