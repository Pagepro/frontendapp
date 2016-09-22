(function() {
  'use strict';

  var keyboardFormSubmit = function() {
    return {
      link: function(scope, element, attrs) {
        angular.element(element).find('textarea, input').bind('keydown', function(e) {
          if(e.keyCode == 13 && e.metaKey) {
            // this looks off, but works, somehow
            // when trying to submit form, the page redirects with params
            // when trying to submit on button, works just fine
            angular.element(element).find('button').submit();
          }
        });
      }
    };
  };

  keyboardFormSubmit.$inject = [];

  angular.module('frontendApp').directive('keyboardFormSubmit', keyboardFormSubmit);
}());
