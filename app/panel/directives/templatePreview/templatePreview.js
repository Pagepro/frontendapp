(function() {
  'use strict';
  var templatePreview = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/templatePreview/templatePreview.html',
      link: function (scope) {
        console.log(scope);
      }
    };
  };

  templatePreview.$inject = [];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());

