/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var _ = require('lodash');

    var Main = function(appId, appSecret, callback, state) {
        var _services = ['connections', 'companies', 'companies_search', 'people', 'group']
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
            callback: callback,
            state: state
        });
        this.init = function(accessToken, options) {
            if (typeof accessToken === 'string') {
                this.options.accessToken = {
                    token: accessToken,
                    version: 2
                };
            } else {
                this.options.accessToken = accessToken;
            }

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
        };

        /**
         *  Set Callback
         *
         *  @param {String} 'url' to be set
         *
         **/
        this.setCallback = this.auth.setCallback;

        return this;
    }.bind(this);

    module.exports = Main;
}).call(this);
