(function () {
  'use strict';

  var projectsPlaceholder = function () {
    return {
      templateUrl: 'app/panel/directives/projectsPlaceholder/projectsPlaceholder.html',
      link: function (scope, el, attr) {
        scope.thing = attr.placeholding;
      }
    };
  };

  projectsPlaceholder.$inject = [];
  angular.module('panelModule').directive('projectsPlaceholder', projectsPlaceholder);

}());
