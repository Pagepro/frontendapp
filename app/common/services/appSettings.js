(function () {
  'use strict';
  angular.module('frontendApp').value('appSettings', {
      title: 'Fronted App',
      verion: '0.0.2',
      screenshotRoot: function (width, height) {
        if (width && height) {
          return 'http://frontendapp.com/imagefly/w' + width + '-h' + height + '-c/uploads/';
        }
        return 'http://frontendapp.com/uploads/';
      },
      fileRoot: 'http://frontendapp.com/projects/download/file/',
      apiRoot: 'http://localhost:1234/'
      // apiRoot: 'http://api.frontendapp.com/'
  });
}());
