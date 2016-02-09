(function () {
  'use strict';

  var templateUploaderFactory = function ($rootScope) {
    return {
      setUploaderData: function (api) {
        this.id = api.id;
        this.success = api.success;
        $rootScope.$broadcast('templateUploader:updated', true);
      },
      getUploaderData: function () {
        var self = this;
        return {
          id: self.id,
          success: self.success
        };
      }
    };
  };

  templateUploaderFactory.$inject = ['$rootScope'];
  angular.module('panelModule').factory('templateUploaderFactory', templateUploaderFactory);

}());
