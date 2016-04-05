/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function () {

    var _ = require('lodash')
        , util = require('util')
        , request = require('request')
        , oauth = require('oauth')
        , qs = require('querystring')
        ;
    var crypto = require('crypto');

    var states = {};

    function newState() {
        var b = crypto.randomBytes(12);
        var s = b.toString('base64');
        var e = s.replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
        return e;
    }

    var Auth = function (Inherits, args) {
        Inherits(this);

        this.options = {};

        this.authorize = function (res, scope, state, redirectURI) {

            if (res && res.constructor === Array) {
                redirectURI = state;
                state = scope;
                scope = res;
                res = null;
            }

            state = state || newState();
            redirectURI = redirectURI || args.callback;
            states[state] = {
                redirectURI: redirectURI,
            };
            state = encodeURIComponent(state);

            var url = util.format("https://www.linkedin.com/uas/oauth2/authorization?response_type=code" +
                "&client_id=%s" +
                "&state=%s" +
                "&redirect_uri=%s",
                args.appId,
                state,
                encodeURIComponent(redirectURI)
            );

            if (scope && scope.length > 0) {
                url += '&scope=' + scope.join('%20');
            }

            return res ? res.redirect(url) : url;
        };

        this.getAccessToken = function (res, code, stateOut, cb) {

            if (typeof res == 'string') {
                cb = stateOut;
                stateOut = code;
                code = res;
                res = null;
            }

            var state = states[stateOut];

            if (!state) {
                var err = new Error('Possible CSRF attack, state parameters do not match.');
                err.name = 'CSRF Alert';
                return cb(err, null);
            }

            delete states[stateOut];

            var url = "https://www.linkedin.com/uas/oauth2/accessToken",
                form = {
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": state.redirectURI,
                    "client_id": args.appId,
                    "client_secret": args.appSecret
                };

            request.post({url: url, form: form}, function (err, response, body) {

                if (err)
                    return cb(err, null);

                var res = JSON.parse(body);

                if (typeof res.error !== 'undefined') {
                    err = new Error(res.error_description);
                    err.name = res.error;
                    return cb(err, null);
                }

                return cb(null, res);

            })
        };

        this.exchangeAccessToken = function (token, cb) {
            var oauthClient = new oauth.OAuth(
                'https://api.linkedin.com/uas/oauth/requestToken',
                'https://api.linkedin.com/uas/oauth/accessToken',
                args.appId,
                args.appSecret,
                '1.0',
                null,
                'HMAC-SHA1'
            );

            oauthClient.get(
                'https://api.linkedin.com/uas/oauth/accessToken?xoauth_oauth2_access_token=' + encodeURIComponent(token),
                null,
                null,
                function (err, data) {
                    if (err) {
                        return cb(err);
                    }
                    else {
                        data = qs.decode(data);
                        return cb(null, data);
                    }
                }
            );
        };

        this.setAccessToken = function (accessToken) {
            this.options['accessToken'] = accessToken;
        };

        this.getOptions = function () {
            return this.options;
        }

        /**
         *  Set Callback
         *
         *  @param {String} 'url' to be set
         *
         **/
        this.setCallback = function(cb){
          args.callback = cb || args.callback;
        };

        return this;
    }.bind(this);
    module.exports = Auth;
}).call(this);
