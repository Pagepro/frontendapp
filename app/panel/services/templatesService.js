(function() {
  'use strict';

  var templatesService = function($http, appSettings) {
    var self = this;
    this.getTemplates = function(projectId) {
      self.route = appSettings.apiRoot + 'projects/' + projectId + '/templates/';
      return $http.get(this.route);
    };
    this.deleteTemplate = function (templateId) {
      console.log('dummy-text');
      return $http.delete(self.route + '/' + templateId);
    };
  };

  templatesService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').service('templatesService', templatesService);

}());
