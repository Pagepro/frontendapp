(function() {
  'use strict';

  var pagination = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/pagination/pagination.html',
      scope: {
        getterService: '=service'
      },
      transclude: true,
      controller: function($scope) {
        $scope.currentPage = 0;
        $scope.setPage = function(page) {
          if (page >= 0) {
            // @fixme $parent??
            //                     '
            //     |\          .(' *) ' .
            //     | \        ' .*) .'*
            //     |(*\      .*(// .*) .
            //     |___\       // (. '*
            //     ((("'\     // '  * .
            //     ((c'7')   /\)
            //     ((((^))  /  \
            //   .-')))(((-'   /
            //      (((()) __/'
            // jgs   )))( |
            //        (()
            //         ))
            $scope.getterService(page).success(function(resp) {
              $scope.$parent.allProjects = resp.results;
            });
            $scope.currentPage = page;
          } else {
            return false;
          }
        };
      }
    };
  };

  angular.module('panelModule').directive('pagination', pagination);

}());
