(function() {
  'use strict';
  var TicketCtrl = function($scope, $q, $stateParams, commentsService, ticketsService, spinnerService) {
    var ticketPromise;
    var commentsPromise;

    $scope.parentProject = null;
    $scope.comments = null;
    $scope.ticket = null;
    $scope.projectId = $stateParams.projectId;
    $scope.ticketId = null;
    $scope.statusListVisible = false;

    $scope.init = function () {
      spinnerService.show('project-details');

      angular.element('select').customSelect();

      $scope.ticketId = $stateParams.ticketId;
      // Get the ticket
      ticketPromise = ticketsService.getTicketDetails($stateParams.projectId, $stateParams.ticketId);
      ticketPromise
      .success(function (ticket) {
        $scope.ticket = ticket;
      })
      .error(function () {
        // @todo, add some sort of error handling
      });

      // Comments are served separately, get them too
      commentsPromise = commentsService.getComments($stateParams.projectId, $stateParams.ticketId);
      commentsPromise
      .success(function (comments) {
        $scope.comments = comments;
      })
      .error(function () {
        // @todo, add some sort of error handling
      });
      $q.all([ticketPromise, commentsPromise]).then(function () {
        spinnerService.hide('project-details');
      });
    };

    $scope.toggleStatusList = function () {
      $scope.statusListVisible = !$scope.statusListVisible;
    };
    $scope.changeTicketStatus = function () {

    };
  };
  TicketCtrl.$inject = ['$scope', '$q', '$stateParams', 'commentsService', 'ticketsService', 'spinnerService'];
  angular.module('panelModule').controller('TicketCtrl', TicketCtrl);

}());
