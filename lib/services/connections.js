/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var Base = require('../base'),
        _     = require('lodash');

    var Connections = Base.extend(function(config) {
    })
      .methods({
        retrieve: function(url, options, callback) {
          if (url instanceof Function) {
            callback = url;
            options = {};
            url = 'people/~/connections';
          } else
          if (options instanceof Function) {
            callback = options;
            options = {};
            url = url;
            if (typeof url === 'object') {
              options = url;
              url = 'people/~/connections';
            }
          }

          if (!callback || !callback instanceof Function) {
            throw new Error('callback function is required.');
          }

          this.createCall('GET', url, options, callback);
        }
      });

    module.exports = Connections;
})();
