(function () {
  'use strict';

  var ticketStatusService = function () {
    this.getStatus = function (statusCode) {
      var ticketStatus = {
        code: statusCode,
        className: '',
        labelContent: ''
      };
      switch (statusCode) {
        case 1:
          ticketStatus.className = 'new';
          ticketStatus.labelContent = 'New';
          break;
        case 2:
          ticketStatus.className = 'qa';
          ticketStatus.labelContent = 'Q&A';
          break;
        case 3:
          ticketStatus.className = 'rejected';
          ticketStatus.labelContent = 'Rejected';
          break;
        case 4:
          ticketStatus.className = 'finished';
          ticketStatus.labelContent = 'Finished';
          break;
        case 5:
          ticketStatus.className = 'in-progress';
          ticketStatus.labelContent = 'In Progress';
          break;
      }
      return ticketStatus;
    };
  };
  angular.module('panelModule').service('ticketStatusService', ticketStatusService);
}());
