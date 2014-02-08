/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/6/14
 */

(function() {

    var _ = require('lodash');

    var People = function(Inherits, config) {

        Inherits(this);

        var fields = [
            'date-of-birth',
            'educations',
            'languages'
        ]

        this.url = function(url, cb) {
            this.createCall('GET', 'people/url=' + encodeURIComponent(url) + ":("+ fields.join(',') +")", cb)(config);
        };

        this.id = function(id, cb) {
            this.createCall('GET', 'people/id=' + id + ":("+ fields.join(',') +")", cb)(config);
        };

        this.search = function(options, cb) {
            this.createCall('GET', 'people-search', options, cb)(config);
        };

        return this;
    }.bind(this);

    module.exports = People;

}).call(this);