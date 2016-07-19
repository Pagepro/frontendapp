(function () {
  'use strict';

  var status = function () {
    return function(tickets, statusName, lol, kek) {

      var statusMap = {
        active: [1, 2, 5],
        finished: [3, 4]
      };

      if (statusName) {

        var allowedStatuses = _.find(statusMap, function (value, key) {
          if (_.lowerCase(key) === _.lowerCase(statusName)) {
            return value;
          }
        });

        return _.filter(tickets, function (ticket) {
          // if there are matched status codes, let it pass through the filter
          return _.intersection([ticket.status], allowedStatuses).length;
        });

      } else {
        return tickets;
      }
    };
  };

  angular.module('frontendApp').filter('status', status);
}());
