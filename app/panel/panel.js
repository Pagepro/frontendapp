(function() {
  'use strict';
  var panelModule = angular.module('panelModule', []);

  panelModule
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('myProjectsState', {
          url: '/my-projects',
          templateUrl: 'partials/templates/panel/myProjects.html',
          controller: 'MyProjectsCtrl',
          controllerAs: 'MPC',
          pageName: 'My Projects',
          module: 'panel'
        })
        .state('allProjectsState', {
          url: '/all-projects',
          templateUrl: 'partials/templates/panel/allProjects.html',
          controller: 'AllProjectsCtrl',
          controllerAs: 'APC',
          pageName: 'All Projects',
          module: 'panel',
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          }]
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
