(function () {
  'use strict';

  var statusService = function () {
    this.getStatus = function (statusCode) {
      var name = [];
      // name[0]: label class name sufix
      // name[1]: label content
      switch (statusCode) {
        case 0:
          name = ['complete', 'Complete'];
          break;
        case 1:
          name = ['progress', 'In Progress'];
          break;
        case 2:
          name = ['qa', 'Q&A'];
          break;
        case 3:
          name = ['rejected', 'Rejected'];
          break;
        case 4:
          name = ['new', 'New'];
          break;
      }
      return name;
    };
  };

  // statusService.$inject = [];
  angular.module('frontendApp').service('statusService', statusService);
}());
