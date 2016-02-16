(function() {
  'use strict';
  var TicketCtrl = function($scope, $rootScope, $q, $state, $stateParams, commentsService, ticketsService, spinnerService, toaster) {
    var ticketPromise;
    var commentsPromise;

    $scope.parentProject = null;
    $scope.comments = null;
    $scope.ticket = null;
    $scope.projectId = $stateParams.projectId;
    $scope.ticketId = null;
    $scope.processing = false;

    /* to change link in trail(breadcrumbs link)
    ugly hack, I know, but I'm not smart enough to figure out
    anything better */
    _.each($rootScope.trails, function (trail) {
      if (trail.name === 'Project Details') {
        trail.link = '#/project/' + $scope.projectId;
      }
    });

    $scope.init = function() {
      spinnerService.show('project-details');

      angular.element('select').customSelect();

      $scope.ticketId = $stateParams.ticketId;
      // Get the ticket
      ticketPromise = ticketsService.getTicketDetails($stateParams.projectId, $stateParams.ticketId);
      ticketPromise
        .success(function(ticket) {
          $scope.ticket = ticket;
          $scope.currentStatus = ticket.status;
        })
        .error(function() {
          // @todo, add some sort of error handling
        });

      // Comments are served separately, get them too
      commentsPromise = commentsService.getComments($stateParams.projectId, $stateParams.ticketId);
      commentsPromise
        .success(function(comments) {
          $scope.comments = comments.results;
        })
        .error(function() {
          // @todo, add some sort of error handling
        });

      $q.all([ticketPromise, commentsPromise]).then(function() {
        spinnerService.hide('project-details');
      });
    };

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
    $scope.addComment = function(comment) {
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
        });
    };
    $scope.$on('ticket:updated', function (params, data) {
      if (data.updated) {
        ticketsService.getTicketDetails($stateParams.projectId, data.id)
          .success(function (updatedTicket) {
            $scope.ticket = updatedTicket;
            $state.go('ticketState', {
              projectId: $stateParams.projectId,
              ticketId: $stateParams.ticketId
            });
          });
      } else {
        $state.go('ticketState', {
          projectId: $stateParams.projectId,
          ticketId: $stateParams.ticketId
        });
      }
    });
  };
  TicketCtrl.$inject = ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'commentsService', 'ticketsService', 'spinnerService', 'toaster'];
  angular.module('panelModule').controller('TicketCtrl', TicketCtrl);

}());
