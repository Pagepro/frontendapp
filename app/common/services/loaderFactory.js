(function () {
  'use strict';

  var loaderFactory = function () {
    return {
      createLoader: function () {
        console.log('create loader');
      },
      removeLoader: function () {
        console.log('remove loader');
      }
    };
  };

  angular.module('frontendApp').factory('loaderFactory', loaderFactory);
}());
