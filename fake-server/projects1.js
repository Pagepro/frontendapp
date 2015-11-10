'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();

var projects = [];

function Templates() {
  var templates = [];
  while (templates.length < _.random(4, 30)) {
    templates.push({
      "statusCode": _.random(0, 4),
      "id": _.uniqueId(),
      "image": "https://placeimg.com/640/480/any?v=" + _.uniqueId(),
      "name": chance.name({
        middle: true
      })
    });
  }
  return templates;
}

function Files() {
  var files = [];
  while (files.length < _.random(1, 30)) {
    files.push({
      "id": _.uniqueId(),
      "extension": function() {
        var extensions = ['zip', 'psd', 'jpg']
        return extensions[_.random(0, 2)];
      },
      "size": _.random(10, 400),
      "dateUpdated": chance.birthday(),
      "name": chance.name()
    });
  }
  return files;
}

while (projects.length < _.random(10, 40)) {
  projects.push({
    _id: chance.guid(),
    id: _.uniqueId(),
    dateUpdated: chance.birthday(),
    dateAdded: chance.birthday(),
    dateFinished: chance.birthday(),
    fileName: chance.name(),
    progress: _.random(0, 100)
  });
}

_.forEach(projects, function(result) {
  result.templates = new Templates();
  result.files = new Files();
});

module.exports = projects;
