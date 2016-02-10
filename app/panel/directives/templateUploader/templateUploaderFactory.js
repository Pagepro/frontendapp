(function() {
  'use strict';

  var templateUploaderFactory = function($rootScope) {
    var uploader = {};
    return {
      _register: function (data) {
        uploader = data;
        return uploader;
      },
      _destroy: function () {
        uploader = null;
      },
      setSuccess: function (id) {
        if (uploader.id === id) {
          $rootScope.$broadcast('templateUploader:updated', id);
        }
      },
      getUploaderData: function() {
        return uploader;
      },
      resetUploader: function() {
        if (uploader) {
          this._destroy();
        }
      }
    };
  };

  templateUploaderFactory.$inject = ['$rootScope'];
  angular.module('panelModule').factory('templateUploaderFactory', templateUploaderFactory);

}());
