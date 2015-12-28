'use strict';

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();


var ticketDetails = {
    'updated_on': chance.birthday(),
    'created_on': chance.birthday(),
    'author': chance.name(),
    'status': _.random(0, 3),
    'assignee': {
        'name': chance.name(),
        'user_id': _.random(10, 400)
    },
    'description': chance.paragraph({
      'sentences': _.random(5, 9)
    }),
    'screenshots': [
        'nazwa1',
        'nazwa2',
        'nazwa3'
    ],
    // just one or multiple templates may have the same ticket assigned to them??
    templates: [{
        'template_id': _.random(3, 100),
        'template_name': chance.name()
    }],
    'browsers': _.map([0, 1, 2, 3, 4], function (browserCode) {
        if(browserCode % _.random(1, 2) === 0) {
            return browserCode;
        }
    })
};


module.exports = ticketDetails;
