(function () {
  'use strict';
  var panelModule = angular.module('panelModule', []);

  panelModule
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('myProjectsState', {
        url: '/my-projects',
        templateUrl: 'partials/templates/panel/myProjects.html',
        controller: 'MyProjectsCtrl',
        controllerAs: 'MPC',
        pageName: 'My Projects',
        module: 'panel'
      })
      .state('projectState', {
        url: '/project/:projectId',
        templateUrl: 'partials/templates/panel/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'PC',
        pageName: 'Project',
        module: 'panel'
      });
  }]);

}());
