(function() {
  'use strict';

  var templatesService = function($http, appSettings) {
    this.getTemplates = function(projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/templates');
    };
  };

  templatesService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').service('templatesService', templatesService);

}());
