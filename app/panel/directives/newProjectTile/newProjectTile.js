(function() {
  'use strict';

  var newProjectTile = function($state, toaster, projectsService, spinnerService) {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/newProjectTile/newProjectTile.html',
      link: function(scope) {
        scope.focusForm = null;
        scope.isFocused = false;

        scope.focusForm = function() {
          scope.isFocused = !scope.isFocused;
          if (scope.isFocused) {
            angular.element('input[type="text"]').focus();
          }
        };

        scope.loseFocus = function() {
          scope.isFocused = false;
        };

        scope.checkFocus = function(focus, event) {
          if (focus) {
            event.stopPropagation();
          }
        };

        scope.createProject = function(project) {
          spinnerService.show('new-project');
          projectsService.createNewProject(project.name)
            .success(function(createdProject) {
              $state.go('newProjectState', {
                projectId: createdProject.id,
                projectName: createdProject.name
              });
            })
            .error(function() {
              toaster.pop('error', 'Error.', 'We couldn\'t create a new project.');
            })
            .finally(function() {
              spinnerService.hide('new-project');
            });
        };

      }
    };
  };

  newProjectTile.$inject = ['$state', 'toaster', 'projectsService', 'spinnerService'];
  angular.module('panelModule').directive('newProjectTile', newProjectTile);
}());
