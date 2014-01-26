/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/26/14
 */

(function() {
    var _ = require('lodash');

    var Companies = function(Inherits, config) {

        Inherits(this);

        this.company = function(id, cb) {
            this.createCall('GET', 'companies/' +id, cb)(config);
        };

        this.name = function(name, cb) {
            this.createCall('GET', 'companies/universal-name=' + name.split(' ').join('-'), cb)(config);
        }

        this.email_domain = function(domain, cb) {
            this.createCall('GET', 'companies', {"email-domain": domain}, cb)(config);
        };

        this.multiple = function(query, cb) {
            this.createCall('GET', 'companies::(' + query + ')', {strict: true},cb)(config);
        };

        this.asAdmin = function(cb) {
            this.createCall('GET', 'companies', {"is-company-admin": true}, cb)(config);
        };
        return this;
    }.bind(this);

    module.exports = Companies;
}).call(this);