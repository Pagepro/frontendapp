(function() {
  'use strict';

  var pagination = function() {
    return {
      restrict: 'E',
      scope: {
        pageNo: '=page',
        loadPage: '=load'
      },
      templateUrl: 'app/panel/directives/pagination/pagination.html',
      link: function(scope) {
        scope.goToPage = function() {
          scope.pageNo = 1;
          scope.loadPage();
        };
        scope.goFurther = function() {
          scope.pageNo += 1;
          scope.loadPage();
        };
        scope.goBack = function() {
          scope.pageNo -= 1;
          scope.loadPage();
        };
      }
    };
  };

  angular.module('panelModule').directive('pagination', pagination);

}());
