(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, projectsFactory) {
    $scope.myProjects = null;
    function init() {
      projectsFactory.getProjects()
      .success(function (resp) {
        $scope.myProjects = resp;
        console.log(resp);
      })
      .error(function (resp) {
        console.log(resp);
      });
    }
    init();
  };

  MyProjectsCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('frontendApp').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
