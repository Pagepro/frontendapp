(function() {
  'use strict';
  var SubmitBugCtrl = function($scope, $state) {
    var init = function () {
      angular.element('select').customSelect();
      angular.element('.input--file').nicefileinput();
    };

    $scope.returnToProject = function () {
      $state.go('projectState', $state.projectId);
    };

    init();
  };

  SubmitBugCtrl.$inject = ['$scope', '$state'];
  angular.module('panelModule').controller('SubmitBugCtrl', SubmitBugCtrl);

}());
