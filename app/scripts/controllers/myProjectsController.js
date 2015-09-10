(function() {
  'use strict';
  var MyProjectsController = function($scope, projectsFactory) {
    function init() {
      projectsFactory.getProjects()
      .success(function (resp) {
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
