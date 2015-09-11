(function () {
  'use strict';

// this is factory of ALL projects or just for MY projects?
  var projectsFactory = function ($http, appSettings) {
    return {
      getProjects: function () {
        return $http.get(appSettings.apiRoot + 'projects/');
      },
      getProject: function (customerId) {
        return $http.get(appSettings.apiRoot + 'projects/' + customerId);
      }
    };
  };

  projectsFactory.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('projectsFactory', projectsFactory);
}());
