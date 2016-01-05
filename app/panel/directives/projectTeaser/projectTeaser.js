(function() {
  'use strict';
  var projectTeaser = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/projectTeaser/projectTeaser.html',
      link: function (scope) {
        // get thumbnail or place a temp template
        scope.thumbnail = (scope.project.thumbnail.filename) ? (scope.screenshotRoot + scope.project.thumbnail.filename) : 'dist/img/pic_project-1.jpg';
      }
    };
  };

  projectTeaser.$inject = [];
  angular.module('panelModule').directive('projectTeaser', projectTeaser);

}());
