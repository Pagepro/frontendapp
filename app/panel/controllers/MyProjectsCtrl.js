(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, projectsService, spinnerService, appSettings, $q) {
    $scope.myProjects = null;
    $scope.finishedFetching = false;
    $scope.screenshotRoot = appSettings.screenshotRoot(239, 242);

    var dfd = $q.defer();


    $scope.init = function() {
      spinnerService.show('my-projects');
    };

    var projectsPromise = function () {
      projectsService.getProjects(null, 'active')
        .success(function(resp) {
          dfd.resolve(resp.results);
        })
        .error(function() {
          dfd.reject();
        })
        .finally(function(resp) {
          // dfd.resolve(resp.results);
        });

        return dfd.promise;
    };
    projectsPromise().then(function (projects) {
      $scope.myProjects = projects;
      $scope.finishedFetching = true;
      spinnerService.hide('my-projects');
    });
  };

  MyProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService', 'appSettings', '$q'];
  angular.module('panelModule').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
