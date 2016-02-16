(function() {
  'use strict';

  var ticketsService = function($http, appSettings) {
    var self = this;
    this.getTickets = function(projectId, ticketsPage) {
      self.projectId = projectId;
      return $http.get(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets/' + ((ticketsPage > 1)? ('?page=' + ticketsPage) : ''));
    };
    this.setTicketStatus = function(projectId, ticketId, statusId) {
      return $http.patch(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + ticketId + '/', {
        status: statusId
      });
    };
    this.getTicketDetails = function(projectId, ticketId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + ticketId + '/');
    };
  };

  ticketsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('ticketsService', ticketsService);

}());
