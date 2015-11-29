(function() {
  'use strict';
  var panelModule = angular.module('panelModule', []);

  panelModule
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('myProjectsState', {
          url: '/my-projects',
          templateUrl: 'app/panel/templates/myProjects.html',
          controller: 'MyProjectsCtrl',
          controllerAs: 'MPC',
          pageName: 'My Projects',
          module: 'panel'
        })
        .state('allProjectsState', {
          url: '/all-projects',
          templateUrl: 'app/panel/templates/allProjects.html',
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
          templateUrl: 'app/panel/templates/project.html',
          controller: 'ProjectCtrl',
          controllerAs: 'PC',
          pageName: 'Project Details',
          module: 'panel',
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          }]
        });
    }]);

}());
