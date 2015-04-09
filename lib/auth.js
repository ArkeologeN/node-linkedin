/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

;(function() {
  'use strict';

    var klass   = require('klass'),
        util    = require('util'),
        request = require('request'),
        oauth   = require('oauth'),
        qs      = require('querystring');

    var Auth = klass(function(options) {
      this._options = options;
    })
      .methods({
        /**
         * @deprecated  Use getAuthorizeUrl() instead
         */
        authorize: function(res, scope) {
          if (res instanceof Array) {
            scope = res;
            res = null;
          }

          var url = this.getAuthorizeUrl();

          return res ? res.redirect(url) : url;
        },
        getAuthorizeUrl: function(scope) {
          var url = util.format("https://www.linkedin.com/uas/oauth2/authorization?response_type=code" +
              "&client_id=%s" +
              "&scope=%s" +
              "&state=%s" +
              "&redirect_uri=%s",
              this._optoins.appId,
              scope.join(' '),
              Math.random(),
              this._options.callback
          );

          return url;
        },
        getAccessToken: function(code, callback) {
          if (!code) {
            return callback('auth_code is required to retrieve access token.');
          }

          if (!callback instanceof Function) {
            return callback('callback is missing.');
          }

          var url = util.format("https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code" +
              "&code=%s" +
              "&redirect_uri=%s" +
              "&client_id=%s" +
              "&client_secret=%s",
              code,
              this._options.callback,
              this._options.appId,
              this._options.appSecret
          );

          request.get(url, function(err, response, body) {
            if (err) {
              return callback(err, null);
            }

            var result;

            try {
              result = JSON.parse(body);
            } catch(e) {
              return callback(e);
            }

            if (typeof result.error !== 'undefined') {
              var error = new Error(res.error_description);
              error.name = result.error;
              return callback(error);
            }

            return callback(null, result);
          });
        },
        exchangeAccessToken: function(token, callback) {
          if (!callback) {
            return callback(new Error('callback is required.'));
          }

          if (!token) {
            return callback(new Error('token is missing for exchange.'));
          }


          var oauthClient = new oauth.OAuth(
              'https://api.linkedin.com/uas/oauth/requestToken',
              'https://api.linkedin.com/uas/oauth/accessToken',
              this._options.appId,
              this._optoins.appSecret,
              '1.0',
              null,
              'HMAC-SHA1'
          );

          oauthClient.get(
              'https://api.linkedin.com/uas/oauth/accessToken?xoauth_oauth2_access_token=' + encodeURIComponent(token),
              null,
              null,
              function(err, data) {
                  if (err) {
                      return callback(err);
                  }

                  data = qs.decode(data);
                  return callback(null, data);
              }
          );
        },
        setAccessToken: function(accessToken) {
          this._option['accessToken'] = accessToken;
          return this;
        },
        getOptions: function() {
          return this._options;
        }
      });

    module.exports = Auth;
})();
