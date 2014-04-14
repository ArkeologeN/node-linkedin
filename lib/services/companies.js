/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/26/14
 */

(function() {
    var _ = require('lodash');

    var Companies = function(Inherits, config) {
        this.config = config;

        Inherits(this);
        fields = [
            'id', 'name', 'universal-name',
            'email-domains', 'company-type',
            'ticker', 'website-url', 'industries',
            'status', 'logo-url', 'twitter-id',
            'employee-count-range', 'specialties', 'locations',
            'description', 'stock-exchange', 'founded-year',
            'end-year', 'num-followers'
        ];

        this.company = function(id, cb) {
            this.createCall('GET', 'companies/' +id + ":(" + fields.join(',') + ")", cb)(this.config);
        };

        this.name = function(name, cb) {
            this.createCall('GET', 'companies/universal-name=' + name.split(' ').join('-') + ":("+ fields.join(',') + ")", cb)(this.config);
        }

        this.email_domain = function(domain, cb) {
            this.createCall('GET', 'companies', {"email-domain": domain}, cb)(this.config);
        };

        this.multiple = function(query, cb) {
            this.createCall('GET', 'companies::(' + query + ')', {strict: true},cb)(this.config);
        };

        this.asAdmin = function(cb) {
            this.createCall('GET', 'companies', {"is-company-admin": true}, cb)(this.config);
        };
        return this;
    }.bind(this);

    module.exports = Companies;
}).call(this);
