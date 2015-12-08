(function() {
  'use strict';

  var templatesService = function($http, appSettings) {
    var self = this;
    this.getTemplates = function(projectId) {
      self.projectId = projectId;
      self.route = appSettings.apiRoot + 'projects/' + projectId + '/templates/';
      return $http.get(this.route);
    };
    this.deleteTemplate = function (templateId) {
      return $http.delete(self.route + '/' + templateId);
    };
    this.updateOrder = function (sortedArray) {
      return $http.post(appSettings.apiRoot + 'projects/' + self.projectId + '/templates', sortedArray);
    };
  };

  templatesService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').service('templatesService', templatesService);

}());
