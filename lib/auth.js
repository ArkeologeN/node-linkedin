/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var _ = require('lodash')
        , util = require('util')
        , request = require('request');

    var Auth = function(Inherits, args) {
        Inherits(this);

        this.options = {};

        this.authorize = function(res, scope) {
            url = util.format("https://www.linkedin.com/uas/oauth2/authorization?response_type=code" +
                "&client_id=%s" +
                "&scope=%s" +
                "&state=%s" +
                "&redirect_uri=%s",
                args.appId,
                scope.join(' '),
                Math.random(),
                args.callback
            );
            res.redirect(url);
        };

        this.getAccessToken = function(res, code, cb) {
            url = util.format("https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code" +
                "&code=%s" +
                "&redirect_uri=%s" +
                "&client_id=%s" +
                "&client_secret=%s",
                code,
                args.callback,
                args.appId,
                args.appSecret
            );

            request.get(url, function(err, response, body) {
                if (err)
                    return cb(err, null);
                return cb(null, body);
            })
        };

        this.setAccessToken = function(accessToken) {
            this.options['accessToken'] = accessToken;
        };

        this.getOptions = function() {
            return this.options;
        }

        return this;
    }.bind(this);
    module.exports = Auth;
}).call(this);
