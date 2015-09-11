(function() {
  'use strict';
  var headerSection = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/header/headerSection.html',
      link: function (scope) {
        scope.menuVisible = false;
        scope.toggleMenu = function () {
          scope.menuVisible = !scope.menuVisible;
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

