(function () {
  'use strict';

  var projectsService = function ($http, $q, appSettings) {
    var baseUrl = appSettings.apiRoot + 'projects/';

    this.getProjects = function (pageNo, projectStatus) {
      var requestUrl = baseUrl;
      var dfd = $q.defer();

      if (pageNo) {
        requestUrl += ('?page=' + pageNo);
      }
      if (projectStatus) {
        requestUrl += ('?filter=' + projectStatus);
      }

      $http.get(requestUrl, {
        cache: true
      }).success(function (data) {
        dfd.resolve(data);
      });

      return dfd.promise;
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

  projectsService.$inject = ['$http', '$q', 'appSettings'];
  angular.module('panelModule').service('projectsService', projectsService);
}());
