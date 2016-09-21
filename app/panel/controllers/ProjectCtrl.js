(function() {
  'use strict';
  var ProjectCtrl = function($scope, $stateParams, statusService, $rootScope, project, $window, $uiViewScroll) {

    var projectPromise;
    var updatedTpl;

    $rootScope.pageName = project.data.name;

    $scope.project = project.data;
    $scope.tickets = [];
    $scope.projectId = $stateParams.projectId;

    if ($stateParams.anchor) {
      $uiViewScroll(angular.element('#' + $stateParams.anchor));
    }
    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };
    $scope.setDisplayType = function(type) {
      $window.localStorage.setItem('displayType', type);
      $scope.displayType = type;
    };

    $scope.alterTicketCount = function(templateId, type) {
      updatedTpl = _.find($scope.templates, function(tpl) {
        return tpl.id === templateId
      });

      updatedTpl.tickets_count += (type === 'increase') ? 1 : (-1);
    };

    $scope.$on('ticket:submitted', function(params, data) {
      if (data.submitted) {
        $scope.ticketSubmitted(data.id);
        $scope.alterTicketCount(data.id, 'increase');
      }
    });

  };

  ProjectCtrl.$inject = ['$scope', '$stateParams', 'statusService', '$rootScope', 'project', '$window', '$uiViewScroll'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
