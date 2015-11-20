(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, $document, projectsFactory) {
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

    $document.ready(function () {
      $scope.imageReady = true;
    });

    init();
  };

  MyProjectsCtrl.$inject = ['$scope', '$document', 'projectsFactory'];
  angular.module('frontendApp').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
