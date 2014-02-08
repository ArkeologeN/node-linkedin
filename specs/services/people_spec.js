/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/9/14
 */

var linkedin = require('node-linkedin')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')
token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: People Test Suite', function() {
    it('should search people by facet', function(done) {
        linkedin.people.search({'company-name': 'The Plumtree Group'}, function(err, results) {
            if (err ) {
                console.log(err);
                done();
            }

            console.log(JSON.stringify(results));
        });
    });
})