'use strict';

/**
 * Generate a filename from an endpoint descriptor.
 * Useful to enforce a naming convention.
 * @param {Object} config Endpoint descriptor
 * @param {String} the corresponding filename
 */
module.exports = function endpointFilename(config) {
  var verb = (config.verb === 'DELETE' ? 'del' : config.verb.toLowerCase());
  // Remove initial '/'
  var endpoint = config.endpoint.substring(1);
  if (endpoint.length <= 0) {
    endpoint = 'index';
  }
  endpoint = endpoint.replace('/', '-').replace(/\{|\}/g, '');

  return verb + '-' + endpoint;
};