(function() {
  'use strict';
  var HeaderSection = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/directives/headerSection.html',
      link: function (scope, element, attrs) {
        // here we can add for eg. menu toggler
      }
    };
  };

  HeaderSection.$inject = [];
  angular.module('frontendApp').directive('headerSection', HeaderSection);

}());
