/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/6/14
 */

;(function() {
  'use strict';

    var _ = require('lodash'),
        klass = require('klass');

    var People = klass(function(config) {
      this._config = config;

      this._fields = [
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

      this._shortFields = [
          'date-of-birth',
          'educations',
          'languages'
      ];
    })
      .methods({
        me: function(fields, callback) {
          if (fields instanceof Function)
            callback = fields
            fields = this._fields;
          }
          this.createCall('GET', 'people/~:(' + _fields.join(',') + ")", cb)(this.config);
        },
        url: function(url, fields, callback) {
          if (fields instanceof Function) {
            callback = fields;
            fields = this._shortFields;
          }
          this.createCall('GET', 'people/url=' + encodeURIComponent(url) + ":("+ _fields.join(',') +")", cb)(this.config);
        },
        id: function(id, fields, callback) {
          if (fields instanceof Function) {
            callback = fields;
            fields = this._shortFields;
          }
          this.createCall('GET', 'people/id=' + id + ":("+ _fields.join(',') +")", cb)(this.config);
        },
        search: function(options, callback) {
          this.createCall('GET', 'people-search', options, cb)(this.config);
        },
        invite: function(options, callback) {

        },
        share: function(options, callback) {
          this.createCall('POST','https://api.linkedin.com/v1/people/~/shares', {json: options}, cb)(this.config);
        }
      });

    module.exports = People;

})();
