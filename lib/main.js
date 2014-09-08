/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var _ = require('lodash');

    var Main = function(appId, appSecret, callback) {
        var _services = ['connections', 'companies', 'people', 'group']
            , Inherits = require('./inherits')
            , self = this;

        // Make some configuration;
        this.options = {
            api_url: "https://api.linkedin.com/v1/",
            format: 'json'
        };

        this.auth = require('./auth')(Inherits, {
            appId: appId,
            appSecret: appSecret,
            callback: callback
        });
        this.init = function(accessToken, options) {
            this.options.accessToken = accessToken;

            options = options || {};
            this.options.timeout = options.timeout;

            _.forEach(_services, function(service) {
                /**
                 * @exports service
                 * @type {*}
                 */
                module.exports[service] = require(__dirname + '/services/' + service)(Inherits, self.options);
            });
            return module.exports;
        }

        return this;
    }.bind(this);

    module.exports = Main;
}).call(this);