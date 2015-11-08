var express = require('express');
var cors = require('cors');
var fs = require('fs');
var projects = require('./fake-server/projects');
var app = express();

app.use(cors());

app.get('/projects/:id', function(req, res) {
  res.json(projects[req.params.id]);
});

app.get('/projects', function(req, res) {
  res.json(projects);
  //res.json(500, { error: 'An error has occurred!' });
});
app.listen(8080);

console.log('Express listening on port 8080');
