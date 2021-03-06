(function() {
  'use strict';
  var autoFillSync = function($timeout) {
    return {
          require: 'ngModel',
          link: function(scope, elem, attrs, ngModel) {
              var origVal = elem.val();
              $timeout(function () {
                  var newVal = elem.val();
                  if(ngModel.$pristine && origVal !== newVal) {
                      ngModel.$setViewValue(newVal);
                  }
              }, 1);
          }
       };
  };
  autoFillSync.$inject = ['$timeout'];
  angular.module('frontendApp').directive('autoFillSync', autoFillSync);
}());
