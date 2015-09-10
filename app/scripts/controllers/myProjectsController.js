(function() {
  'use strict';
  var MyProjectsController = function($scope) {

    $scope.myProjects = [ // temp solution
        {
            id: 1, // used for proper redirecting to details view
            updated: '22.02.2015', // there will be timestamp probably, pure date for now
            progress: 33, // in percentage. We have to decide if we will get this number from API or we will calculate it on our side
            name: 'Temporibus autem autem autem autem',
            templatesCount: 29
        }, // all names of variables could be different
        {
            id: 2,
            updated: '19.09.2015',
            progress: 99,
            name: 'Frontend App',
            templatesCount: 3
        }
    ];
  };

  MyProjectsController.$inject = ['$scope'];
  angular.module('frontendApp').controller('MyProjectsController', MyProjectsController);

}());
