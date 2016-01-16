(function() {
  'use strict';

  var ticketsService = function($http, appSettings) {
    var self = this;
    this.getTickets = function(projectId, statusParam) {
      self.projectId = projectId;
      return $http.get(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets/' + ( statusParam ? ('?status=' + statusParam) : ''));
    };
    this.getTicketDetails = function (projectId, ticketId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/tickets/' + ticketId);
    };
  };

  ticketsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('ticketsService', ticketsService);

}());
