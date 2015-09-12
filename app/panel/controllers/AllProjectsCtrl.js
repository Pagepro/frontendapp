(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsFactory) {
    $scope.allProjects = null;

    function init() {
      projectsFactory.getProjects()
      .success(function (resp) {
        $scope.allProjects = resp;
        console.log(resp);
      })
      .error(function (resp) {
        console.log(resp);
      });
    }

    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('frontendApp').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
