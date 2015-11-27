'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();

var projects = [];

while (projects.length < _.random(10, 20)) {
  projects.push({
    'id': _.uniqueId(),
    'name': chance.name(),
    'short_description': chance.paragraph({
      sentences: 1
    }),
    'long_description': chance.paragraph({
      sentences: 4
    }),
    'user_id': _.uniqueId(),
    'client_id': _.uniqueId(),
    'updated_on': chance.birthday(),
    'created_on': chance.birthday(),
    'finished': _.random(0, 100),
    'finished_date': chance.birthday(),
    'deadline_date': chance.birthday(),
    'suggested_delivery_date': chance.birthday(),
    'repository': _.uniqueId('git@git.prvsrv.com:front-end/_') + '.git',
    'status': _.random(0, 4),
    'templates': _.random(3, 15)
  });
}

module.exports = {
  'count': 306,
  'next': 'http://api.frontendapp.com/projects/?page=3',
  'previous': 'http://api.frontendapp.com/projects/',
  'results': projects
};
