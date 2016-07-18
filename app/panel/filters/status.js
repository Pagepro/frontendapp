(function () {
  'use strict';

  var status = function () {
    return function(tickets, statusName) {

      var statusMap = {
        active: [1, 2, 5],
        finished: [3, 4]
      };
      if (!statusName && statusName.length < 1) {
        return tickets;
      } else {
        var allowedStatusCodes = _.flatten(_.toArray(_.pick(statusMap, statusName)));

        var dupa = _.map(tickets, function (ticket) {
          var hasIt = _.forEach(allowedStatusCodes, function (code) {
            (ticket.status === code) ? true : false;
          });
          if (hasIt) {
            return ticket;
          }
        });
        console.log(dupa);

        // return _.map(tickets, function (ticket) {
          // return _.filter(_.toArray(_.pick(statusMap, statusName)), function (selectedStatusValue) {
          //   if (_.indexOf(selectedStatusValue, ticket.status) > 0) {
          //     console.log(ticket);
          //     return ticket;
          //   }
          // });

        // });
        // return _.filter(tickets, function (item) {
          // var c = _.filter(_.pick(statusMap, statusName), function (selectedStatusValue) {
          //   return (_.indexOf(selectedStatusValue, item.status) > 0) ? true : false;
          // });
        //   console.log(c);

        //   return c;
        // });
      }


    };
  };

  angular.module('frontendApp').filter('status', status);
}());
