'use strict';

var Chance = require('chance');
var chance = new Chance();

function Auth() {
  return {
    token: chance.apple_token()
  };
}

module.exports = new Auth();
