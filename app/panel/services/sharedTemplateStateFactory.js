(function() {
  'use strict';
  var templatesFactory = function() {
    var templates = null;

    function setTemplates(data) {
      templates = data;
    }

    function getTemplates() {
      return templates;
    }
    return {
      setTemplates: setTemplates,
      getTemplates: getTemplates
    };
  };

  templatesFactory.$inject = [];
  angular.module('panelModule').factory('templatesFactory', templatesFactory);
}());
