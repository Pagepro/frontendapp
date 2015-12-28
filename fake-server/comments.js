'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();


var comments = [];
while (comments.length < _.random(3, 15)) {
  comments.push({
    'id': _.uniqueId(),
    'author': chance.name(),
    'content': chance.paragraph({
        sentences: 3
    })
  });
}
module.exports = comments;
