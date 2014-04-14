/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/26/14
 */

var linkedin = require('../../')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')
    token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: Companies Test Suite', function() {

    it('should get company by the given id', function(done) {
        linkedin.companies.company('162479', function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            done();
        });
    });

    it('should get company by universal name', function(done) {
        linkedin.companies.name('facebook', function(err, company) {
            expect(err).toBe(null);
            expect(company.errorCode).toBeUndefined();
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            expect(company.name).toBe('Facebook');
            done();
        });
    });

    it('should get company by email domain', function(done) {
        linkedin.companies.email_domain('apple.com', function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            expect(company._total).toBeGreaterThan(0);
            done();
        });
    });

    it('should get multiple companies by single defined criteria', function(done) {
        linkedin.companies.multiple('162479,universal-name=linkedinin', function(err, companies) {
            expect(err).toBe(null);
            expect(companies).not.toBe(null);
            expect(typeof companies).toBe('object');
            expect(companies._total).toBeGreaterThan(0);
            done();
        });
    });

    it('should get all the companies of authenticated user', function(done) {
        linkedin.companies.asAdmin(function(err, companies) {
            expect(err).toBe(null);
            expect(companies).not.toBe(null);
            expect(typeof companies).toBe('object');
            done();
        });
    });
});