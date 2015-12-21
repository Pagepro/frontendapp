'use strict';

var express = require('express');
var cors = require('cors');
var app = express();

var auth = require('./auth');
var projects = require('./projects');
var files = require('./files');
var templates = require('./templates');
var tickets = require('./tickets');

app.use(cors());

app.post('/auth', function (req, res) {
  res.json(auth.token);
});

app.get('/projects/:id', function(req, res) {
  if (req.headers.authorization) {
    res.json(projects[req.params.id]);
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});

app.get('/projects/:id/templates', function(req, res) {
  if (req.headers.authorization) {
    res.json(templates);
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});

app.get('/projects/:id/files', function(req, res) {
  if (req.headers.authorization) {
    res.json(files);
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});

app.get('/projects/:id/tickets', function(req, res) {
  if (req.headers.authorization) {
    res.json(tickets);
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});

app.get('/projects', function(req, res) {
  if (req.headers.authorization) {
    if (req.query.page) {
      res.json({});
    } else {
      res.json(projects);
    }
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});

app.listen(1234);
console.log('Express listening on port 1234');
