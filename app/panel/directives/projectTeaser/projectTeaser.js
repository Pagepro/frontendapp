(function() {
  'use strict';
  var projectTeaser = function(appSettings) {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/projectTeaser/projectTeaser.html',
      link: function (scope, dupa, dupa2) {
        // get thumbnail or place a temp template
        scope.thumbnail = (scope.project.thumbnail.filename) ? (appSettings.filesRoot + scope.project.thumbnail.filename) : 'dist/img/pic_project-1.jpg';
      }
    };
  };

  projectTeaser.$inject = ['appSettings'];
  angular.module('panelModule').directive('projectTeaser', projectTeaser);

}());
