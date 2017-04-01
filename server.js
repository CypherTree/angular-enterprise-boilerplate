'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');

var app = express();
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8800;
var options = {
  'index': [env + '.html']
};
var apps = fs.readdirSync(__dirname + '/public/apps');

// Middlewares
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-auth-token');
  next();
});

app.use(express.static(__dirname + '/public', options));
app.use(express.static(__dirname + '/components'));

if (env === 'production') {
  app.use(express.static(__dirname + '/public/dist'));
}

/**
 * Apps
 */

apps.forEach(function (name) {
  if (env === 'production') {
    app.use(express.static(__dirname + '/public/dist/' + name));
  }
  app.get(['/' + name, '/' + name + '/index.html'], function (req, res) {
    serve(name, res);
  });
  app.use('/' + name, express.static(__dirname + '/public', options));
  app.use('/' + name, express.static(__dirname + '/components'));

});

app.get('/', function (req, res) {
  serve('storeapp', res);
});

app.options('*', function (req, res) {
  res.status(200).end();
});

// Stubs
require('./stubs')(app);

// Start listening
app.listen(port, function () {
  console.log('Art Boutique Client served on port '.concat(port));
});

/**
 * Serve
 */

function serve (name, res) {
  var app = require('./public/apps/'+ name +'/app.json');
  var file = '/public/apps/'+ name + '/' + env +'.html';

  fs.readFile(__dirname + file, 'utf8', function (err, text) {
    var files = [];

    files = app.dependencies.map(paths('bower_components/'));

    if (app.components) {
      files = files.concat(app.components.map(paths('')));
    }

    if (app.elements) {
      files = files.concat(app.elements.map(paths('elements/')));
    }

    files = files.concat(app.files.map(paths('apps/' + name + '/')));

    function paths (path) {
      return function (file) {
        return file.slice(-5) === '.html'
          ? '<link rel="import" href="/' + path + file + '">'
          : '<script src="/' + path + file + '"></script>';
      }
    }

    text = text.replace('<!-- INSERT_SCRIPTS -->', files.join('\n'));
    res.send(text);
  });
}
