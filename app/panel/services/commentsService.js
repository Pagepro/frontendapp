(function() {
  'use strict';

  var commentsService = function($http, appSettings) {
    this.getComments = function(projectId, templateId, filter) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + templateId + '/comments' + (filter ? ('?filter=' + filter) : ('')) + '/');
    };
    this.getComment = function(projectId, templateId, commentId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + templateId + '/comments/' + commentId + '/');
    };
    this.addComment = function(comment, projectId, templateId) {
      return $http.post(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + templateId + '/comments/', {
        content: comment.content
      });
    };
    this.removeComment = function(projectId, templateId, commentId) {
      return $http.delete(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + templateId + '/comments/' + commentId + '/');
    };
  };

  commentsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('commentsService', commentsService);

}());
