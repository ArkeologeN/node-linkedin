/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   9/8/14
 */

(function() {
    "use strict";

    var _ = require('lodash');

    var Group = function(Inherits, config) {

        this.config = config;

        Inherits(this);

        var fields = [
            'creation-timestamp', 'title', 'summary' ,
            'creator:(first-name,last-name,picture-url,headline)', 'likes',
            'attachment:(image-url,content-domain,content-url,title,summary)',
            'relation-to-viewer'
        ], params = {
            start: 0,
            count: 10,
            order: 'recency',
            category: 'discussion'
        };

        this.feeds = function(gid, _fields, _params, cb) {
            if (_.isFunction(_fields)) {
                // No Fields or Parameters passed.
                cb = _fields;
                _fields = fields;
                _params = params;
            }

            if (_.isFunction(_params)) {
                // Fields is available but not params.
                cb = _params;
                _params = params;
            }

            this.createCall('GET', 'groups/' + gid + '/posts:(' + _fields.join(',') +")", _params, cb)(this.config);
        };

        return this;
    }.bind(this);

    module.exports = Group;
}).call(this);