(function() {
  'use strict';

  var ticketsService = function($http, appSettings) {
    var self = this;
    this.getTickets = function(projectId) {
      self.projectId = projectId;
      return $http.get(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets');
    };
    this.updateOrder = function (sortedArray) {
      return $http.post(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets', sortedArray);
    };
  };

  ticketsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('ticketsService', ticketsService);

}());
