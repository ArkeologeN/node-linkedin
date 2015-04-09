/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

;(function() {

    var _ = require('lodash'),
        klass = require('klass'),
        Auth = require('./auth');

    /**
     *
     */
    var Main = klass(function(appId, appSecret, callback) {

      if (!appId) {
        throw new Error('appId is required to be set.');
      }

      if (!appSecret) {
        throw new Error('appSecret is required to be set.');
      }

      this._services = ['connections', 'companies', 'people', 'group'];
      this._options = {
        apiUrl: "https://api.linkedin.com/v1/",
        format: 'json'
      };

      this.auth = new Auth({
        appId: appId,
        appSecret: appSecret,
        callback: callback
      });
    })
      .methods({
        init: function(accessToken, options) {
          if (typeof accessToken === 'string') {
            this._options.accessToken = {
              token: accessToken,
              version: 2
            };
          } else {
            this._options.accessToken = accessToken;
          }

          options = options || {};
          options.timeout = options.timeout || 10000;
          var _this = this;
          this._services.forEach(function(service) {
            var Service = require(__dirname + '/services/' + service);
            module.exports[service] = new Service(_this._options);
          })
        }
      });

    module.exports = Main;
})();
