/**
 * @author  Gal Bracha <galbra@gmail.com>
 * @since   6/29/15
 */

var linkedin = require('../../')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')
    token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: Companies Search Test Suite', function() {

    it('should get company by given name', function(done) {
        linkedin.companies_search.name('facebook', 1, function(err, company) {
            expect(err).toBe(null);
            expect(company.errorCode).toBeUndefined();
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            expect(company.companies.values[0]name).toBe('Facebook');
            done();
        });
    });

});
