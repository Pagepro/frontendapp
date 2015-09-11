(function() {
  'use strict';
  var ProjectCtrl = function($scope, projectsFactory) {
    $scope.myProjects = null;
  };

  ProjectCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('frontendApp').controller('ProjectCtrl', ProjectCtrl);

}());
