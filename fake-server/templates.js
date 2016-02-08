'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();


function getExtension(number) {
  var extensions = ['zip', 'psd', 'jpg'];
  return extensions[number];
}

function Templates() {
  var templates = [];

  while (templates.length < _.random(10, 20)) {
    templates.push({
      'id': _.uniqueId(),
      'project_id': _.uniqueId(),
      'filename': chance.name(),
      'name': chance.name(),
      'original_filename': chance.word({
        syllables: 20
      }),
      'extension': getExtension(_.random(0, 2)),
      'size': _.random(10, 400),
      'order': _.uniqueId(),
      'status': _.random(1, 5),
      'uploaded_date': chance.birthday(),
      'fullimage_url': 'http://localhost:1234/uploads' + chance.hash() + '.png',
      'html_url': 'http://login:frontend@rmd.ddeevv.pl/player.html'
    });
  }
  return templates;
}

module.exports = new Templates();
