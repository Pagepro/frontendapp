(function() {
  'use strict';
  var TicketCtrl = function($scope, $stateParams, commentsService) {
    $scope.parentProject = null;
    $scope.comments = null;
    $scope.statusListVisible = false;

    var init = function () {
      angular.element('select').customSelect();
      $scope.parentProject = $stateParams.projectId;
      $scope.ticketId = $stateParams.ticketId;

      commentsService.getComments($stateParams.projectId, $stateParams.ticketId)
      .success(function (comments) {
        console.log(comments);
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

  TicketCtrl.$inject = ['$scope', '$stateParams', 'commentsService'];
  angular.module('panelModule').controller('TicketCtrl', TicketCtrl);

}());
