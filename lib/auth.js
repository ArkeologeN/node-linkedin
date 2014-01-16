/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var _ = require('lodash');

    var Auth = function(Inherits) {
        Inherits(this);

        this.options = {};

        this.authorize = function() {

        };

        this.getAccessToken = function() {

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