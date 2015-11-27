(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, $document, projectsService) {
    $scope.myProjects = null;
    function init() {
      projectsService.getProjects()
      .success(function (resp) {
        $scope.myProjects = resp.results;
      })
      .error(function (resp) {
        //
      });
    }
    init();
  };

  MyProjectsCtrl.$inject = ['$scope', '$document', 'projectsService'];
  angular.module('panelModule').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
