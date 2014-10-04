/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/9/14
 */

var linkedin = require('../../')('77pmiwaj7b1ofn', 'EKKZCDTL7IiNUqra')
token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: People Test Suite', function() {

    it('should retrieve profile of current user', function(done ) {
       linkedin.people.me(function(err, data) {
           done();
       });
    });
})