'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();

var projects = function() {
  var templates = ['o'];
  var files = ['b'];
  var results;
  chance.mixin({
    'projects': function() {
      return {
        _id: _.uniqueId(),
        id: chance.random(0, 100),
        projectProgress: chance.first(10, 100),
        dateUpdated: chance.birthday(),
        dateAdded: chance.birthday(),
        dateFinished: chance.birthday(),
        templates: templates,
        files: files,
        fileName: chance.name()
      };
    }
  });

  while (results.length < _.random(1, 40)) {
    results.push(chance.projects());
  }
  return results;
};

return {
  projects: projects
};
