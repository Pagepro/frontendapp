'use strict';

var express = require('express');
var cors = require('cors');
var app = express();

var auth = require('./fake-server/auth');
var projects = require('./fake-server/projects');
var files = require('./fake-server/files');
var templates = require('./fake-server/templates');

app.use(cors());

app.post('/auth', function (req, res) {
  res.json(auth.token);
});

app.get('/projects/:id', function(req, res) {
  res.json(projects[req.params.id]);
});

app.get('/projects/:id/templates', function(req, res) {
  res.json(templates);
});

app.get('/projects/:id/files', function(req, res) {
  res.json(files);
});

app.get('/projects', function(req, res) {
  res.json(projects);
  //res.json(500, { error: 'An error has occurred!' });
});

app.listen(8080);
console.log('Express listening on port 8080');
