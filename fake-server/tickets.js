'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();
var comments = require('./comments');



function Comments() {
    return comments;
}

function Tickets() {
    var tickets = [];
    while (tickets.length < _.random(20, 40)) {
      tickets.push({
        'id': _.uniqueId(),
        'name': chance.name(),
        'description': chance.paragraph({
          sentences: _.random(3, 8)
        }),
        'user_id': _.uniqueId(),
        'created_on': chance.birthday(),
        'status': _.random(1, 5),
        'comments': new Comments()
      });
    }
    return {
      count: tickets.length,
      results: tickets
    };
}

module.exports = new Tickets();
