(function() {
  'use strict';
  var headerSection = function(authService, accountService) {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/header/headerSection.html',
      link: function(scope) {
        accountService.getUserData()
          .success(function(user) {
            scope.letter = (user.first_name).charAt(0);
          });
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

  headerSection.$inject = ['authService', 'accountService'];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());
