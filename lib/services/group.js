/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   9/8/14
 */

(function() {
    "use strict";

    var Base = require('../base');

    var Group = Base.extend(function(config) {
      this._fields = [
          'creation-timestamp', 'title', 'summary' ,
          'creator:(first-name,last-name,picture-url,headline)', 'likes',
          'attachment:(image-url,content-domain,content-url,title,summary)',
          'relation-to-viewer'
      ];

      this._params = {
        start: 0,
        count: 10,
        order: 'recency',
        category: 'discussion'
      };
    })
      .methods({
        feeds: function(gid, fields, params, callback) {
          if (typeof fields === 'function') {
              // No Fields or Parameters passed.
              callback = fields;
              fields = this._fields;
              params = this._params;
          }

          if (typeof params === 'function') {
              // Fields is available but not params.
              callback = params;
              params = this._params;
          }

          this.createCall('GET', 'groups/' + gid + '/posts:(' + fields.join(',') +")", params, callback);

        }
      });

    module.exports = Group;
})();
