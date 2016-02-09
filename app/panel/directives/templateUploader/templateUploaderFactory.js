(function() {
  'use strict';

  var templateUploaderFactory = function($rootScope) {
    var uploader = {};
    return {
      _register: function (data) {
        uploader = data;
      },
      _destroy: function (id) {
        if (uploader) {
          uploader = {};
        }
      },
      setSuccess: function (id) {
        if (uploader.id === id) {
          $rootScope.$broadcast('templateUploader:updated', id);
        }
      },
      setUploaderData: function(api) {
        if (!uploader) {
          throw new Error("The uploader does not exist any longer.");
        }
        uploader.id = api.id;
        uploader.success = api.success;
        $rootScope.$broadcast('templateUploader:updated', true);
      },
      getUploaderData: function() {
        return uploader;
      },
      resetUploader: function() {
        uploader.progress = 0;
        uploader.totalSize = 0;
        uploader.files = null;
        this._destroy();
      }
    };
  };

  templateUploaderFactory.$inject = ['$rootScope'];
  angular.module('panelModule').factory('templateUploaderFactory', templateUploaderFactory);

}());
