(function () {
  'use strict';

  var projectsService = function ($http, $q, appSettings, CacheFactory) {
    CacheFactory('projectsCache', {
      maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
      cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
      deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
    });
    var baseUrl = appSettings.apiRoot + 'projects/';
    var projectsCache = CacheFactory.get('projectsCache');

    this.getProjects = function (pageNo, projectStatus) {
      var requestUrl = baseUrl;
      var params = '';
      var dfd = $q.defer();

      if (pageNo) {
        params += ('?page=' + pageNo);
      }
      if (projectStatus) {
        params += ('?filter=' + projectStatus);
      }

      requestUrl += params;

      if (projectsCache.get(params)) {
        dfd.resolve(projectsCache.get(params))
      } else {
        $http.get(requestUrl).success(function (data) {
          projectsCache.put(params, data);
          dfd.resolve(data);
        });
      }


      return dfd.promise;
    };
    this.getProject = function (projectId) {
      return $http.get(baseUrl + projectId + '/');
    };
    this.createNewProject = function (projectName) {
      projectsCache.removeAll();
      return $http.post(baseUrl, {
        name: projectName
      });
    };
  };

  projectsService.$inject = ['$http', '$q', 'appSettings', 'CacheFactory'];
  angular.module('panelModule').service('projectsService', projectsService);
}());
