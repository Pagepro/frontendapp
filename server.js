var express = require('express');
var cors = require('cors');
var Chance = require('chance');
var chance = new Chance();
var fs = require('fs');
var projects;

fs.readFile( __dirname + '/test.json', function (err, data) {
  if (err) {
    throw err;
  }
  /**
   * Generate the array using
   * http://beta.json-generator.com/

   * Update this markup every time!
[
  {
    'repeat:7': {
      _id: '{{objectId()}}',
      id: '{{index()}}',
      statusCode: '{{integer(0, 3)}}',
      projectProgress: '{{integer(0, 100)}}',
      dateUpdated: '{{moment(this.date(new Date(2015, 2, 1), new Date())).valueOf()}}',
      dateAdded: '{{moment(this.date(new Date(2014, 0, 1), new Date())).valueOf()}}',
      dateFinished: '{{moment(this.date(new Date(2014, 0, 1), new Date())).valueOf()}}',
      templates: [
        {
          'repeat:5': {
            statusCode: '{{integer(0, 3)}}',
            id: '{{index()}}',
            image: 'https://placeimg.com/640/480/any?v={{integer(4, 100)}}',
            name: function () {
              return 'templateName' + '{{index()}}';
            }
          }
        }
      ],
      files: [
        {
          'repeat:3': {
            id: '{{index()}}',
            extension: '{{random("zip", "psd", "7z")}}',
            size: '{{integer(20, 1024)}}',
            dateUpdated: '{{moment(this.date(new Date(2015, 2, 1), new Date())).valueOf()}}',
            name: function () {
              return 'templateName' + '{{index()}}';
            }
          }
        }
      ],
      fileName: function (tags) {
        var names = ['RZF', 'KRD', 'SOK'];
        return names[tags.integer(0, names.length - 1)] + '_{{surname()}}';
      }
    }
  }
]
  */
  projects = JSON.parse(data);
});

var app = express();
app.use(cors())

app.use(express.static(__dirname + '/'));

app.get('/projects/:id', function(req, res) {
  var customerId = parseInt(req.params.id);
  var data = {};
  for (var i = 0, len = projects.length; i < len; i++) {
    if (projects[i].id === customerId) {
      data = projects[i];
      break;
    }
  }
  res.json(data);
});

app.get('/projects', function(req, res) {
  res.json(projects);
  //res.json(500, { error: 'An error has occurred!' });
});

app.listen(8080);

console.log('Express listening on port 8080');
console.log(chance.integer());
