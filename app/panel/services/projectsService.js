(function () {
  'use strict';

  var projectsService = function ($http, appSettings) {

    this.getProjects = function (pageNo) {
      var baseUrl = appSettings.apiRoot + 'projects/';
      if (!pageNo) {
        return $http.get(baseUrl);
      }
      return $http.get(baseUrl + '?p=' + pageNo);
    };
    this.getProject = function (projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId);
    };
  };

  projectsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('projectsService', projectsService);
}());