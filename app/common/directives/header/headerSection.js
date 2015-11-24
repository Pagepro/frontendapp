(function() {
  'use strict';
  var headerSection = function(authService) {
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
          authService.logout();
        };
      }
    };
  };

  headerSection.$inject = ['authService'];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());
