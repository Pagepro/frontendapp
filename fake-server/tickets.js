'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();

var tickets = [];
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

while (tickets.length < _.random(10, 20)) {
  tickets.push({
    'id': _.uniqueId(),
    'name': chance.name(),
    'description': chance.paragraph({
      sentences: 4
    }),
    'user_id': _.uniqueId(),
    'created_on': chance.birthday(),
    'status': _.random(0, 4),
    'comments': comments
  });
}

module.exports = tickets;
