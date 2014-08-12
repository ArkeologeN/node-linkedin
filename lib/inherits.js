/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {
    var _ = require('lodash')
        , request = require('request')
        , util = require('util')
        , url = require('url');

    var Handler = function(subClass) {
        this.createCall = function(method, path, options, callback) {
            return function(config) {
                if (_.isFunction(options)) {
                    callback = options;
                    options = {};
                }
                options.oauth2_access_token = config.accessToken;
                options.strict = options.strict || false;
                options.format = config.format;
                path = url.format({
                    pathname: path,
                    query: options
                });

                if (options['strict'] == true) {
                    path = config.api_url + path;
                } else {
                    path = url.resolve(config.api_url, path);
                }

                var parameters = {
                    url: path,
                    method: method,
                    timeout: config.timeout || 60 * 1000 /* Default to 60sec */
                };
                if (options.json) parameters.json = options.json;

                request(parameters, function(err, response, body) {
                    return callback(err, typeof body === 'string' ? JSON.parse(body) : body);
                });
            }
        };

        _.merge(subClass, this);
        return this;
    }.bind(this);

    module.exports = Handler;
}).call(this);