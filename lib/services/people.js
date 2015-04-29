/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/6/14
 */

;(function() {
  'use strict';

    var Base = require('../base');

    var People = Base.extend(function(config) {
      // Parent automatically called.
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
          if (fields instanceof Function) {
            callback = fields;
            fields = this._fields;
          }

          if (typeof callback !== 'function') {
            throw new Error('callback is required, but missing!');
          }

          this.createCall('GET', 'people/~:(' + fields.join(',') + ")", callback);
        },
        url: function(url, fields, callback) {
          if (fields instanceof Function) {
            callback = fields;
            fields = this._shortFields;
          }

          if (typeof callback === 'function') {
            throw new Error('callback is required, but missing!');
          }

          this.createCall('GET', 'people/url=' + encodeURIComponent(url) + ":("+ fields.join(',') +")", callback);
        },
        id: function(id, fields, callback) {
          if (fields instanceof Function) {
            callback = fields;
            fields = this._shortFields;
          }

          if (typeof callback === 'function') {
            throw new Error('callback is required, but missing!');
          }

          this.createCall('GET', 'people/id=' + id + ":(" + fields.join(',') +")", callback);
        },
        search: function(options, callback) {
          if (typeof callback === 'function') {
            throw new Error('callback is required, but missing!');
          }

          this.createCall('GET', 'people-search', options, callback);
        },
        invite: function(options, callback) {

        },
        share: function(options, callback) {
          if (typeof callback === 'function') {
            throw new Error('callback is required, but missing!');
          }

          this.createCall('POST','https://api.linkedin.com/v1/people/~/shares', {json: options}, callback);
        }
      });

    module.exports = People;

})();
