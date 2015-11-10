'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();


function getExtension(number) {
  var extensions = ['zip', 'psd', 'jpg'];
  return extensions[number];
}

function Files() {
  var files = [];

  while (files.length < _.random(10, 20)) {
    files.push({
      'id': _.uniqueId(),
      'project_id': _.uniqueId(),
      'filename': _.kebabCase(chance.name()),
      'original_filename': chance.word({
        syllables: 20
      }),
      'extension': getExtension(_.random(0, 2)),
      'size': _.random(10, 400),
      'order': _.uniqueId(),
      'status': _.random(0, 100),
      'uploaded_date': chance.birthday()
    });
  }
  return files;
}

module.exports = new Files();
