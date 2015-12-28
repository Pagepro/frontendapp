(function() {
  'use strict';
  var TicketCtrl = function($scope, $stateParams, commentsService, ticketsService) {
    $scope.parentProject = null;
    $scope.comments = null;
    $scope.statusListVisible = false;

    var init = function () {
      angular.element('select').customSelect();
      $scope.parentProject = $stateParams.projectId;
      $scope.ticketId = $stateParams.ticketId;

      // Get the ticket
      ticketsService.getTicketDetails($stateParams.projectId, $stateParams.ticketId)
      .success(function (ticket) {
        $scope.ticket = ticket;
      })
      .error(function (response) {
        // fixme, add some sort of error handling
        console.log(response);
      });

      // Comments are served separately, get them too
      commentsService.getComments($stateParams.projectId, $stateParams.ticketId)
      .success(function (comments) {
        $scope.comments = comments;
      })
      .error(function (response) {
        // fixme, add some sort of error handling
        console.log(response);
      });
    };

    $scope.toggleStatusList = function () {
      $scope.statusListVisible = !$scope.statusListVisible;
    };
    $scope.changeTicketStatus = function () {

    };

    init();
  };

  TicketCtrl.$inject = ['$scope', '$stateParams', 'commentsService', 'ticketsService'];
  angular.module('panelModule').controller('TicketCtrl', TicketCtrl);

}());
