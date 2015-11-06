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
        case 0:
          projectStatus.className = 'finished';
          projectStatus.labelContent = 'Complete';
          break;
        case 1:
          projectStatus.className = 'in-progress';
          projectStatus.labelContent = 'In Progress';
          break;
        case 2:
          projectStatus.className = 'qa';
          projectStatus.labelContent = 'Q&A';
          break;
        case 3:
          projectStatus.className = 'rejected';
          projectStatus.labelContent = 'Rejected';
          break;
        case 4:
          projectStatus.className = 'new';
          projectStatus.labelContent = 'New';
          break;
      }
      return projectStatus;
    };
  };
  angular.module('frontendApp').service('statusService', statusService);
}());
