/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var _ = require('lodash');

    var Connections = function(Inherits, config) {
        this.config = config;

        Inherits(this);

        this.retrieve = function(url, options, cb) {
            if (_.isFunction(url)) {
                cb = url;
                options = {};
                url = 'people/~/connections';
            }
            else if (_.isFunction(options)) {
                cb = options;
                if (_.isObject(url)) {
                    options = url;
                    url = 'people/~/connections';
                } else {
                    options = {};
                    url = url;
                }
            }

            if (_.isUndefined(cb))
                throw Error('callback must be defined');

            this.createCall('GET', url, options, cb)(this.config);
        };

        return this;
    }.bind(this);
    module.exports = Connections;
}).call(this);
