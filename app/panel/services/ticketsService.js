(function() {
  'use strict';

  var ticketsService = function($http, appSettings) {
    this.getTickets = function(projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/tickets');
    };
  };

  ticketsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('ticketsService', ticketsService);

}());
