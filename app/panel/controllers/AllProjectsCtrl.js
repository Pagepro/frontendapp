(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsFactory) {
    $scope.allProjects = null;

    function init() {
      projectsFactory.getProjects()
      .success(function (resp) {
        $scope.allProjects = resp;
      })
      .error(function (resp) {
        console.log(resp);
      });
    }

    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
