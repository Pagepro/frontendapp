(function () {
  'use strict';
  angular.module('frontendApp').value('appSettings', {
      title: 'Fronted App',
      verion: '0.0.2',
      screenshotRoot: 'http://frontendapp.com/uploads/',
      fileRoot: 'http://frontendapp.com/projects/download/file/',
      apiRoot: 'http://localhost:1234/'
      // apiRoot: 'http://api.frontendapp.com/'
  });
}());
