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
        'screenshot1',
        'screenshot2',
        'screenshot3'
    ],
    // just one or multiple templates may have the same ticket assigned to them??
    templates: [{
        'template_id': _.random(3, 100),
        'template_name': chance.name()
    }],
    // they are being added as a text field, so lets not complicate things with browser codes, especially with systems being there too
    'browsers': 'IE8, IE9 - windows 7, Safari - OSX 10.11.1'
};


module.exports = ticketDetails;
