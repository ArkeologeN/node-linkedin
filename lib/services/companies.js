/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/26/14
 */

(function() {
    var _ = require('lodash');

    var Companies = function(Inherits, config) {
        this.config = config;

        Inherits(this);
        var fields = [
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

        this.company_stats = function(id, cb) {
            this.createCall('GET', 'companies/' +id + "/company-statistics", cb)(this.config);
        };

        this.company_historical_follower_stats = function(id, start, end, cb) {
            this.createCall('GET', 'companies/' +id + "/historical-follow-statistics", {"time-granularity": "day","start-timestamp": start,"end-timestamp": end}, cb)(this.config);
        };

        this.followers_stats = function(id, options, cb) {
            this.createCall('GET', 'companies/' +id + "/historical-follow-statistics", options, cb)(this.config);
        };

        this.company_historical_status_update_stats = function(id, start, end, cb) {
            this.createCall('GET', 'companies/' +id + "/historical-status-update-statistics", {"time-granularity": "day","start-timestamp": start,"end-timestamp": end}, cb)(this.config);
        };

        this.status_update_stats = function(id, options, cb) {
            this.createCall('GET', 'companies/' +id + "/historical-status-update-statistics", options, cb)(this.config);
        };

        this.name = function(name, cb) {
            this.createCall('GET', 'companies/universal-name=' + name.split(' ').join('-') + ":("+ fields.join(',') + ")", cb)(this.config);
        };

        this.email_domain = function(domain, cb) {
            this.createCall('GET', 'companies', {"email-domain": domain}, cb)(this.config);
        };

        this.multiple = function(query, cb) {
            this.createCall('GET', 'companies::(' + query + '):(' + fields.join(',') + ')', {strict: true},cb)(this.config);
        };

        this.asAdmin = function(cb) {
            this.createCall('GET', 'companies', {"is-company-admin": true}, cb)(this.config);
        };

        this.getUpdate = function (id, updateId, options, cb) {
            if (_.isFunction(options)) {
                cb = options;
                options = {};
            }
            this.createCall('GET', 'companies/' + id + '/updates/key=' + updateId, options, cb)(this.config);
        };

        this.updates = function (id, options, cb) {
            if (_.isFunction(options)) {
                cb = options;
                options = {};
            }
            this.createCall('GET', 'companies/' + id + '/updates', options, cb)(this.config);
        };

        this.share = function (id, options, cb) {
            this.createCall('POST', 'https://api.linkedin.com/v1/companies/' + id + '/shares', {json: options}, cb)(this.config);
        };

        this.update = function (id, update_id, cb) {
            this.createCall('GET', 'companies/' + id + '/updates/key=' + update_id, cb)(this.config);
        };
        return this;
    }.bind(this);

    module.exports = Companies;
}).call(this);
