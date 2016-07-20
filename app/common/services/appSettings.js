(function() {
  'use strict';

  var urlSettings = {
    local: {
      baseUrl: '#',
      apiRoot: 'http://localhost:1234/'
    },
    dev: {
      baseUrl: 'http://dev.frontendapp.com/',
      apiRoot: 'http://dev.api.frontendapp.com/'
    },
    prod: {
      baseUrl: 'http://frontendapp.com/',
      apiRoot: 'http://api.frontendapp.com/'
    }
  };

  var environment = urlSettings.dev;

  angular.module('frontendApp').value('appSettings', {
    title: 'Fronted App',
    verion: '1.0.2',
    apiRoot: environment.apiRoot,

    fileRoot: environment.baseUrl + 'projects/download/file/',
    redirectionUrl: environment.baseUrl,
    templatesSrc: environment.baseUrl + 'projects/download/templates/',
    filesSrc: environment.baseUrl + 'projects/download/files/',
    screenshotRoot: function(width, height) {
      if (width && height) {
        return environment.baseUrl + 'imagefly/w' + width + '-h' + height + '-c/uploads/';
      }
      return environment.baseUrl + 'uploads/';
    }
  });

}());
