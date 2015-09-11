(function() {
  'use strict';
  var headerSection = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/header/headerSection.html',
      link: function () {
      }
    };
  };

  headerSection.$inject = [];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());
