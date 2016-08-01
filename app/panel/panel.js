(function() {
  'use strict';
  var panelModule = angular.module('panelModule', []);

  panelModule
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        // temp
        .state('forceLogin', {
          url: '/token/:token',
          controller: 'forceLoginCtrl',
          params: {
            'token': null
          }
        })
        // endtemp
        .state('newProjectState', {
          url: '/new-project',
          templateUrl: 'app/panel/templates/newProject.html',
          controller: 'NewProjectCtrl',
          controllerAs: 'NPC',
          pageName: 'Upload Files',
          module: 'panel',
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          }],
          params: {
            'projectId': null,
            'projectName': null
          }
        })
        .state('myProjectsState', {
          url: '/my-projects',
          templateUrl: 'app/panel/templates/myProjects.html',
          controller: 'MyProjectsCtrl',
          controllerAs: 'MPC',
          pageName: 'My Projects',
          module: 'panel',
          resolve: {
            projects: ['projectsService', function(projectsService) {
              return projectsService.getProjects(null, 'active');
            }]
          }
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
          }],
          resolve: {
            allProjects: ['projectsService', function (projectsService) {
              return projectsService.getProjects(null, 'all');
            }]
          }
        })
        .state('projectState', {
          url: '/project/:projectId',
          templateUrl: 'app/panel/templates/project.html',
          controller: 'ProjectCtrl',
          controllerAs: 'PC',
          pageName: 'Project Details',
          module: 'panel',
          params: {
            'projectId': null,
            'anchor': null
          },
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          }],
          resolve: {
            project: ['projectsService', '$stateParams', function (projectsService, $stateParams) {
              return projectsService.getProject($stateParams.projectId);
            }]
          }
        })
          .state('projectState.submitBug', {
            url: '/new-ticket',
            templateUrl: 'app/panel/templates/submitBug.html',
            controller: 'SubmitBugCtrl',
            controllerAs: 'SBC',
            pageName: 'New Ticket',
            module: 'panel',
            params: {
              'projectId': null,
              'templateId': null
            },
            resolve: {
              templates: ['templatesService', '$stateParams', function (templatesService, $stateParams) {
                return templatesService.getTemplates($stateParams.projectId);
              }],
              template: ['templates', '$stateParams', function (templates, $stateParams) {
                return _.find(templates, function (template) {
                  return template.id === $stateParams.templateId;
                });
              }]
            }
          })
          .state('projectState.editTemplate', {
            url: '/edit-template/:templateId',
            templateUrl: 'app/panel/templates/editTemplate.html',
            controller: 'EditTemplateCtrl',
            controllerAs: 'ETC',
            pageName: 'Edit Template',
            module: 'panel',
            resolve: {
              template: ['templatesService', '$stateParams', function (templatesService, $stateParams) {
                return templatesService.getTemplate($stateParams.projectId, $stateParams.templateId);
              }]
            }
          })
        .state('ticketState', {
          url: '/project/:projectId/ticket/:ticketId',
          templateUrl: 'app/panel/templates/ticket.html',
          controller: 'TicketCtrl',
          controllerAs: 'TC',
          pageName: 'Ticket Details',
          module: 'panel',
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          },
          {
            name: 'Project Details',
            link: '4'
          }],
          resolve: {
            ticket: ['ticketsService', '$stateParams', function (ticketsService, $stateParams) {
              return ticketsService.getTicketDetails($stateParams.projectId, $stateParams.ticketId);
            }],
            comments: ['commentsService', '$stateParams', function (commentsService, $stateParams) {
              return commentsService.getComments($stateParams.projectId, $stateParams.ticketId);
            }]
          }
        })
          .state('ticketState.editDetails', {
            templateUrl: 'app/panel/templates/submitBug.html',
            controller: 'EditDescriptionCtrl',
            controllerAs: 'EDC',
            pageName: 'Edit Description',
            module: 'panel',
            params: {
              'projectId': null,
              'templateId': null
            }
          });
    }]);

}());
