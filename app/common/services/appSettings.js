(function () {
  'use strict';
  angular.module('frontendApp').value('appSettings', {
      title: 'Fronted App',
      verion: '0.0.2',
      filesRoot: 'http://frontendapp.com/uploads/',
      // apiRoot: 'http://localhost:8080/'
      apiRoot: 'http://api.frontendapp.com/'
  });
}());
