(function () {
  'use strict';
  angular.module('frontendApp').value('appSettings', {
      title: 'Customers Application',
      verion: '0.0.1',
      apiRoot: 'http://localhost:8080/'
  });
}());
