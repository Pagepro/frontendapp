(function() {
  'use strict';

  var filesService = function($http, appSettings) {
    this.getFiles = function(projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/files/');
    };
    this.removeFile = function(projectId, fileId) {
      return $http.delete(appSettings.apiRoot + 'projects/' + projectId + '/files/' + fileId + '/');
    };
  };

  filesService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('filesService', filesService);

}());
