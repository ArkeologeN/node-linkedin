/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {
    var klass   = require('klass'),
        request = require('request'),
        util    = require('util'),
        url     = require('url');

    var Base = klass(function(config) {
      this._config = config || {};
      this._config.accessToken = this._config.accessToken || {};
    })
      .methods({
        createCall: function(method, path, options, callback) {
          if (options instanceof Function) {
            callback = options;
            options = {};
          }

          if (!callback || !callback instanceof Function) {
            throw new Error('callback function is required and missing.');
          }

          if (typeof this._config !== 'object') {
            return callback(new Error('`config` is missing.'));
          }

          if (this._config.accessToken.version === 2) {
            options.oauth2_access_token = this._config.accessToken.token;
          }

          options.strict = options.strict || false;
          options.format = this._config.format;
          var path = url.format({
            pathname: path,
            query: options
          });

          path = url.resolve(this._config.apiUrl, path);
          if (options.strict === true) {
            path = this._config.apiUrl + path;
          }

          var parameters = {
              url: path,
              method: method,
              timeout: this._config.timeout
          };

          if (this._config.accessToken.version === 1) {
              parameters.headers = {
                  oauth_token: config.accessToken.token
              };
          }
          if (options.json) parameters.json = options.json;

          request(parameters, function(err, response, body) {
            if (err) {
              return callback(err);
            }

            var result;
            try {
              result = JSON.parse(body);
            } catch(e) {
              return callback(e);
            }

            return callback(null, result || body);
          });
        }
      });

    module.exports = Base;
})();
