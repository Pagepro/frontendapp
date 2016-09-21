(function() {
  'use strict';
  var TicketCtrl = function($scope, $rootScope, $state, $timeout, $stateParams, commentsService, ticketsService, templatesService, toaster, comments, ticket) {
    var ticketPromise;
    var commentsPromise;

    $scope.parentProject = null;

    $scope.comments = comments.data.results;
    $scope.ticket = ticket.data;
    $scope.currentStatus = ticket.data.currentStatus;

    $scope.projectId = $stateParams.projectId;
    $scope.ticketId = $stateParams.ticketId;
    $scope.processing = false;
    $scope.submitted = false;

    angular.element('select').customSelect();
    /* to change link in trail(breadcrumbs link)
    ugly hack, I know, but I'm not smart enough to figure out
    anything better */
    _.each($rootScope.trails, function(trail) {
      if (trail.name === 'Project Details') {
        trail.link = '#/project/' + $scope.projectId;
      }
    });

    $scope.removeComment = function(commentId) {
      if (confirm('Are you sure you want to remove this comment?')) {
        commentsService.removeComment($stateParams.projectId, $stateParams.ticketId, commentId)
          .success(function() {
            $scope.comments = _.filter($scope.comments, function(comment) {
              return comment.id !== commentId;
            });
            toaster.pop('success', 'Comment deleted.');
          })
          .error(function() {
            toaster.pop('error', 'Couldn\'t remove the comment.');
          });
      }
    };

    $scope.removeTicket = function(ticketId) {
      if (confirm('Are you sure you want to remove this ticket?')) {
        ticketsService.removeTicket($stateParams.projectId, ticketId)
        .success(function(response) {
          toaster.pop('success', 'Ticket deleted successfully.');
          templatesService.removeCache($stateParams.projectId);
          $state.go('projectState', {
            projectId: $stateParams.projectId
          });
        })
        .error(function(response) {
          toaster.pop('error', 'Couldn\'t remove the ticket.');
        })
      }

    };

    $scope.addComment = function(comment) {
      if (!comment || !comment.content.length) {
        $scope.submitted = true;
        $timeout(function () {
          $scope.submitted = false;
        }, 5000);
        return false;
      }
      $scope.processing = true;
      commentsService.addComment(comment, $stateParams.projectId, $stateParams.ticketId)
        .success(function(newComment) {
          // clear comment field
          $scope.comment = null;

          $scope.comments.push(newComment);
          toaster.pop('success', 'Comment added.');
        })
        .error(function() {
          toaster.pop('error', 'Couldn\'t add a comment.');
        })
        .finally(function() {
          $scope.processing = false;
          $scope.submitted = false;
        });
    };

    $scope.$on('ticket:updated', function(params, data) {
      if (data.updated) {
        ticketsService.getTicketDetails($stateParams.projectId, data.id)
          .success(function(updatedTicket) {
            $scope.ticket = updatedTicket;
            $rootScope.preventAutoScroll = true;
            $state.go('ticketState', {
              projectId: $stateParams.projectId,
              ticketId: $stateParams.ticketId
            });
          });
      } else {
        $rootScope.preventAutoScroll = true;
        $state.go('ticketState', {
          projectId: $stateParams.projectId,
          ticketId: $stateParams.ticketId
        });
      }
    });
  };

  TicketCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', '$stateParams', 'commentsService', 'ticketsService', 'templatesService', 'toaster', 'comments', 'ticket'];
  angular.module('panelModule').controller('TicketCtrl', TicketCtrl);

}());
