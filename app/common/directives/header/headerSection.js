(function() {
  'use strict';
  var headerSection = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/header/headerSection.html',
      link: function (scope) {
        scope.menuVisible = false;
        scope.toggleMenu = function (e) {
          console.log(e);
          scope.menuVisible = !scope.menuVisible;
          if (e) return false;
        };
        scope.hideMenu = function () {
          scope.menuVisible = false;
        }
      }
    };
  };

  headerSection.$inject = [];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());

