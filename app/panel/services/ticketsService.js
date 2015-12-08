(function() {
  'use strict';

  var ticketsService = function($http, appSettings) {
    var self = this;
    this.getTickets = function(projectId) {
      self.projectId = projectId;
      return $http.get(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets');
    };
  };

  ticketsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('ticketsService', ticketsService);

}());
