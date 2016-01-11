(function() {
  'use strict';
  var TicketCtrl = function($scope, $q, $stateParams, commentsService, ticketsService, spinnerService, toaster) {
    var ticketPromise;
    var commentsPromise;

    $scope.parentProject = null;
    $scope.comments = null;
    $scope.ticket = null;
    $scope.projectId = $stateParams.projectId;
    $scope.ticketId = null;
    $scope.statusListVisible = false;
    $scope.processing = false;

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
    $scope.removeComment = function (commentId) {
      commentsService.removeComment($stateParams.projectId, $stateParams.ticketId, commentId)
      .success(function (comments) {
        $scope.comments = comments;
        toaster.pop('success', 'Comment deleted.');
      })
      .error(function () {
        toaster.pop('error', 'Couldn\'t remove the comment.');
      });
    };
    $scope.addComment = function (comment) {
      $scope.processing = true;
      commentsService.addComment(comment, $stateParams.projectId, $stateParams.ticketId)
      .success(function (comments) {
        $scope.comments = comments;
        $scope.comment = null;
        toaster.pop('success', 'Comment added.');
      })
      .error(function () {
        toaster.pop('error', 'Couldn\'t add a comment.');
      })
      .finally(function () {
        $scope.processing = false;
      });
    };
  };
  TicketCtrl.$inject = ['$scope', '$q', '$stateParams', 'commentsService', 'ticketsService', 'spinnerService', 'toaster'];
  angular.module('panelModule').controller('TicketCtrl', TicketCtrl);

}());
