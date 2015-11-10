(function() {
  'use strict';

  var templatesFactory = function($http, appSettings) {
    return {
      getTemplates: function(projectId) {
        return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/templates');
      }
    };
  };

  templatesFactory.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('templatesFactory', templatesFactory);

}());
