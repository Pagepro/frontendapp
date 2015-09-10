(function() {
  'use strict';
  var MyProjectsController = function($scope, projectsFactory) {
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

  MyProjectsController.$inject = ['$scope', 'projectsFactory'];
  angular.module('frontendApp').controller('MyProjectsController', MyProjectsController);

}());
