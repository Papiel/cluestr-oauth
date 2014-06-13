'use strict';

var restify = require('restify');

var extendDefaults = require('../helpers/extend-defaults.js');
var filename = require('../helpers/endpoint-filename.js');
var configuration = require('../../config/configuration.js');

var defaultDescriptor = require('../../config/json/default-descriptor.json');
var apiDescriptors = require('../../config/json/api-descriptors.json');


var server = restify.createServer();
var port = configuration.test.port;

Object.keys(apiDescriptors).forEach(function(name) {
  var config = apiDescriptors[name];
  extendDefaults(config, defaultDescriptor);
  var verb = (config.verb === 'DELETE' ? 'del' : config.verb.toLowerCase());

  if(config.requireId) {
    config.endpoint = config.endpoint.replace('{id}', ':id');
  }
  if(config.requireIdentifier) {
    config.endpoint = config.endpoint.replace('{identifier}', ':id');
  }

  server[verb](config.endpoint, function(req, res, next) {
    // if (invalid request)
    //   next(new restify.error))

    var json = require('./mocks/' + filename(config) + '.json');
    res.send(config.expectedStatus, json);

    return next();
  });
});

server.listen(port, function() {
  console.log('Test server listening on port ' + port);
});