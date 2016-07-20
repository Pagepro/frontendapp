(function () {
  'use strict';

  var projectTickets = function ($window, $filter) {
    return {
      isolate: false,
      restrict: 'EA',
      templateUrl: 'app/panel/directives/projectTickets/projectTickets.html',
      controller: ['$scope', function ($scope) {
        $scope.ticketsOrderBy = '';
        $scope.reverse = false;

        $scope.filteredBy = $window.localStorage.ticketsFilter ? $window.localStorage.ticketsFilter : 'active';

        $scope.filterStatus = function (status, $event) {
          $event.preventDefault();
          if ($scope.filteredBy !== status) {
            $window.localStorage.ticketsFilter = status;
            $scope.filteredBy = status;
          } else {
            $window.localStorage.ticketsFilter = 'none';
            $scope.filteredBy = 'none';
          }
        };

        $scope.order = function (ticketsOrderBy) {
          // starting from reverse = false, so the 2nd click will toggle it to true
          // 3rd click will turn off the orderBy filter
          if (ticketsOrderBy !== $scope.ticketsOrderBy) {
            $scope.ticketsOrderBy = ticketsOrderBy;
            // here's a reset on changing filter name
            $scope.reverse = false;
          } else {
            if (!$scope.reverse) {
              $scope.reverse = true;
            } else {
              $scope.ticketsOrderBy = '';
            }
          }
        };
      }]
    };
  };

  projectTickets.$inject  = ['$window', '$filter'];
  angular.module('panelModule').directive('projectTickets', projectTickets);

}());
