(function () {
  'use strict';

// this is factory of ALL projects or just for MY projects?
  var projectsFactory = function ($http, appSettings) {
    return {
      getProjects: function (pageNo) {
        var baseUrl = appSettings.apiRoot + 'projects/';
        if (!pageNo) {
          return $http.get(baseUrl);
        }
        return $http.get(baseUrl + '?p=' + pageNo);
      },
      getProject: function (projectId) {
        return $http.get(appSettings.apiRoot + 'projects/' + projectId);
      }
    };
  };

  projectsFactory.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('projectsFactory', projectsFactory);
}());
