(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, appSettings, projects) {
    $scope.screenshotRoot = appSettings.screenshotRoot(239, 242);
    $scope.myProjects = projects.results;
  };

  MyProjectsCtrl.$inject = ['$scope', 'appSettings', 'projects'];
  angular.module('panelModule').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
