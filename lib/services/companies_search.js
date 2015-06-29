/**
 * @author  Gal Bracha <galbra@gmail.com>
 * @since   6/29/15
 */

(function() {
    var _ = require('lodash');

    var CompaniesSearch = function(Inherits, config) {
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

        this.name = function(name, count, cb) {
            this.createCall('GET', 'company-search' + ":(companies:("+ fields.join(',') + "))",{'strict': true, 'count': count, 'keywords': name}, cb)(this.config);
        }
        return this;
    }.bind(this);

    module.exports = CompaniesSearch;
}).call(this);