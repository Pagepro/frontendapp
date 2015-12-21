(function() {
  'use strict';

  var commentsService = function($http, appSettings) {
    this.getComments = function(projectId, templateId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + templateId + '/comments/');
    };
  };

  commentsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('commentsService', commentsService);

}());
