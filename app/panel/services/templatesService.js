(function() {
  'use strict';

  var templatesService = function($http, $q, appSettings, CacheFactory) {
    CacheFactory('templatesCache');

    var self = this;
    this.getTemplates = function(projectId) {
      self.projectId = projectId;

      var templatesCache = CacheFactory.get('templatesCache');
      var dfd = $q.defer();

      if (templatesCache.get(projectId)) {
        dfd.resolve(templatesCache.get(projectId));
      } else {
        $http.get(appSettings.apiRoot + 'projects/' + projectId + '/templates/').success(function (response) {
          dfd.resolve(response);
          templatesCache.put(projectId, response);
        });
      }
      return dfd.promise;
    };
    this.getTemplate = function(projectId, templateId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/templates/' + templateId + '/');
    };
    this.updateTemplate = function(projectId, templateId) {
      return $http.put(appSettings.apiRoot + 'projects/' + projectId + '/templates/' + templateId + '/');
    };
    this.deleteTemplate = function(projectId, templateId) {
      return $http.delete(appSettings.apiRoot + 'projects/' + projectId + '/templates/' + templateId + '/');
    };
    this.updateOrder = function(sortedArray) {
      return $http.post(appSettings.apiRoot + 'projects/' + self.projectId + '/set_order/', sortedArray);
    };
    this.removeCache = function(templateId) {
      var templatesCache = CacheFactory.get('templatesCache');
      if (templateId) {
        templatesCache.remove(self.projectId, templateId)
      } else { /* ...remove all */ }
    }
  };

  templatesService.$inject = ['$http', '$q', 'appSettings', 'CacheFactory'];
  angular.module('frontendApp').service('templatesService', templatesService);

}());
