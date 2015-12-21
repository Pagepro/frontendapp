(function() {
  'use strict';
  var EditTemplateCtrl = function($scope, $state) {

    var init = function () {
      angular.element('.input--file').nicefileinput();
    };

    $scope.returnToProject = function () {
      $state.go('projectState', $state.projectId);
    };

    init();
  };

  EditTemplateCtrl.$inject = ['$scope', '$state'];
  angular.module('panelModule').controller('EditTemplateCtrl', EditTemplateCtrl);

}());
