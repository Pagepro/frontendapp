(function () {
  'use strict';

  var statusService = function () {
    this.getStatus = function (statusCode) {
      var projectStatus = {
        code: statusCode,
        className: '',
        labelContent: ''
      };
      switch (statusCode) {
        case 1:
          projectStatus.className = 'new';
          projectStatus.labelContent = 'New';
          break;
        case 2:
          projectStatus.className = 'in-progress';
          projectStatus.labelContent = 'In Progress';
          break;
        case 3:
          projectStatus.className = 'qa';
          projectStatus.labelContent = 'Q&A';
          break;
        case 4:
          projectStatus.className = 'rejected';
          projectStatus.labelContent = 'Rejected';
          break;
        case 5:
          projectStatus.className = 'finished';
          projectStatus.labelContent = 'Finished';
          break;
      }
      return projectStatus;
    };
  };
  angular.module('panelModule').service('statusService', statusService);
}());
