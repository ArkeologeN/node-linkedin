/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/26/14
 */

(function() {
    var Base = require('../base');

    var Companies = Base.extend(function(config) {
      this._fields = [
          'id', 'name', 'universal-name',
          'email-domains', 'company-type',
          'ticker', 'website-url', 'industries',
          'status', 'logo-url', 'twitter-id',
          'employee-count-range', 'specialties', 'locations',
          'description', 'stock-exchange', 'founded-year',
          'end-year', 'num-followers'
      ];
      return this;
    })
      .methods({
        company: function(id, callback) {
          this.createCall('GET', 'companies/' +id + ":(" + this._fields.join(',') + ")", callback);
        },
        name: function(name, callback) {
          this.createCall('GET', 'companies/universal-name=' + name.split(' ').join('-') + ":("+ this._fields.join(',') + ")", callback);
        },
        email_domain: function(domain, callback) {
            this.createCall('GET', 'companies', {"email-domain": domain}, callback);
        },
        multiple: function(query, callback) {
            this.createCall('GET', 'companies::(' + query + '):(' + this._fields.join(',') + ')', {strict: true}, callback);
        },
        asAdmin: function(callback) {
            this.createCall('GET', 'companies', {"is-company-admin": true}, callback);
        },
        updates: function(id, options, callback) {
          if (typeof options === 'function') {
            callback = options;
            options = {};
          }
          this.createCall('GET', 'companies/' + id + '/updates', options, callback)
        }
      });

    module.exports = Companies;
})();
