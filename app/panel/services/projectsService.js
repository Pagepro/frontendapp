(function () {
  'use strict';

  var projectsService = function ($http, appSettings) {
    var baseUrl = appSettings.apiRoot + 'projects/';
    this.getProjects = function (pageNo, projectStatus) {
      var requestUrl = baseUrl;

      if (pageNo) {
        requestUrl += ('?page=' + pageNo);
      }
      if (projectStatus) {
        requestUrl += ('?filter=' + projectStatus);
      }
      return $http.get(requestUrl);
    };
    this.getProject = function (projectId) {
      return $http.get(baseUrl + projectId + '/');
    };
    this.createNewProject = function (projectName) {
      return $http.post(baseUrl, {
        name: projectName
      });
    };
  };

  projectsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('projectsService', projectsService);
}());
