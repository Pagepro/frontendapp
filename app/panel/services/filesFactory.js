(function() {
  'use strict';

  var filesFactory = function($http, appSettings) {
    return {
      getFiles: function(projectId) {
        return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/files');
      }
    };
  };

  filesFactory.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('filesFactory', filesFactory);

}());
