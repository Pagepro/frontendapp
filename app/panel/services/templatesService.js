(function() {
  'use strict';

  var templatesService = function($http, appSettings) {
    var self = this;
    this.getTemplates = function(projectId) {
      self.projectId = projectId;
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/templates/');
    };
    this.getTemplate = function (projectId, templateId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/templates/' + templateId);
    };
    this.updateTemplate = function (projectId, templateId) {
      return $http.put(appSettings.apiRoot + 'projects/' + projectId + '/templates/' + templateId);
    };
    this.deleteTemplate = function (projectId, templateId) {
      return $http.delete(appSettings.apiRoot + 'projects/' + projectId + '/templates/' + templateId);
    };
    this.updateOrder = function (sortedArray) {
      return $http.post(appSettings.apiRoot + 'projects/' + self.projectId + '/templates', sortedArray);
    };
  };

  templatesService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').service('templatesService', templatesService);

}());
