'use strict';

var express = require('express');
var cors = require('cors');
var app = express();
var _ = require('lodash');

var auth = require('./auth');
var projects = require('./projects');
var files = require('./files');
var templates = require('./templates');
var tickets = require('./tickets');
var ticketDetails = require('./ticketDetails');
var comments = require('./comments');

app.use(cors());

app.post('/auth', function (req, res) {
  res.json(auth.token);
});

app.post('/projects/', function(req, res) {
  res.json({
    id: _.random(67, 400),
    name: 'New Project Name'
  });
});

app.put('/projects/:id', function(req, res) {
  res.status(200).json({success: 'All good.'});
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

app.post('/projects/:id/templates', function(req, res) {
    res.status(200).json({ success: 'You have successfully added a new template!' });
    // res.json(401, { error: 'An error has occurred!' });
  // }
});
app.post('/uploads', function(req, res) {
    res.status(200).json({ success: 'You have successfully added a new template!' });
});

app.get('/projects/:id/templates/:templateId', function(req, res) {
  if (req.headers.authorization) {
    res.json(templates[1]);
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});
app.put('/projects/:id/templates/:templateId', function(req, res) {
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

app.post('/projects/:id/tickets', function(req, res) {
  if (req.headers.authorization) {
    res.json(200, {success: 'A new ticket has been added.'});
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});

app.get('/projects/:id/tickets/:ticketId', function(req, res) {
  if (req.headers.authorization) {
    res.json(ticketDetails);
  } else {
    res.json(401, { error: 'An error has occurred!' });
  }
});
app.get('/projects/:id/tickets/:ticketId/comments', function(req, res) {
  if (req.headers.authorization) {
    res.json(comments);
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
