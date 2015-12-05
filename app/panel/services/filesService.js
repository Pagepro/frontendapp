(function() {
  'use strict';

  var filesService = function($http, appSettings) {
    this.getFiles = function(projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/files/');
    };
  };

  filesService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('filesService', filesService);

}());
