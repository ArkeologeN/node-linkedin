/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/6/14
 */

(function() {

    var _ = require('lodash');

    var People = function(Inherits, config) {
        this.config = config;

        Inherits(this);

        var short_fields = [
            'date-of-birth',
            'educations',
            'languages'
        ];

        var fields = [
            'id', 'first-name', 'last-name', 'maiden-name',
            'formatted-name', 'headline', 'location',
            'industry', 'current-share', 'num-connections', 'num-connections-capped',
            'summary', 'specialties', 'positions', 'picture-url','picture-urls::(original)',
            'email-address', 'last-modified-timestamp', 'associations', 'interests',
            'publications', 'patents', 'languages', 'skills', 'certifications',
            'educations', 'courses', 'volunteer', 'num-recommenders',
            'recommendations-received', 'mfeed-rss-url', 'following', 'job-bookmarks',
            'suggestions', 'date-of-birth', 'related-profile-views', 'honors-awards',
            'phone-numbers', 'bound-account-types', 'im-accounts', 'main-address',
            'twitter-accounts', 'primary-twitter-account', 'connections', 'group-memberships',
            'network', 'public-profile-url'
        ];

        this.me = function(_fields, cb) {
            if (_.isFunction(_fields)) {
                cb = _fields;
                _fields = fields;
            }
            this.createCall('GET', 'people/~:(' + _fields.join(',') + ")", cb)(this.config);
        };

        this.url = function(url, _fields, cb) {
            if (_.isFunction(_fields)) {
                cb = _fields;
                _fields = short_fields;
            }
            this.createCall('GET', 'people/url=' + encodeURIComponent(url) + ":("+ _fields.join(',') +")", cb)(this.config);
        };

        this.id = function(id, _fields, cb) {
            if (_.isFunction(_fields)) {
                cb = _fields;
                _fields = short_fields;
            }
            this.createCall('GET', 'people/id=' + id + ":("+ _fields.join(',') +")", cb)(this.config);
        };

        this.search = function(options, cb) {
            this.createCall('GET', 'people-search', options, cb)(this.config);
        };

        this.invite = function(options, cb) {
            this.createCall('POST', 'people/~/mailbox', {json: options}, cb)(this.config);
        };

        this.share = function(options, cb){
          this.createCall('POST','https://api.linkedin.com/v1/people/~/shares', {json: options}, cb)(this.config);
        }

        return this;
    }.bind(this);

    module.exports = People;

}).call(this);
