'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();

function Account() {
  return {
    id: _.random(0, 1000),
    email: chance.email({domain: 'pagepro.pl'}),
    first_name: chance.first(),
    last_name: chance.last(),
    username: chance.name()
  };
}

module.exports = new Account();
