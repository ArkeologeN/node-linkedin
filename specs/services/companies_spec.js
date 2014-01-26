/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/26/14
 */

var linked = require('node-linkedin')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')
    token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linked = linked.init(token);

describe('API: Companies Test Suite', function() {

    it('should get company by the given id', function(done) {
        linked.companies.company('162479', function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            done();
        });
    });

    it('should get company by universal name', function(done) {
        linked.companies.name('logica', function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            expect(company.name).toBe('Logica');
            done();
        });
    });

    it('should get company by email domain', function(done) {
        linked.companies.email_domain('apple.com', function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            expect(company._total).toBeGreaterThan(0);
            done();
        });
    });

    it('should get multiple companies by single defined criteria', function(done) {
        linked.companies.multiple('162479,universal-name=linkedin', function(err, companies) {
            expect(err).toBe(null);
            expect(companies).not.toBe(null);
            expect(typeof companies).toBe('object');
            expect(companies._total).toBeGreaterThan(0);
            done();
        });
    });

    it('should get all the companies of authenticated user', function(done) {
        linked.companies.asAdmin(function(err, companies) {
            expect(err).toBe(null);
            expect(companies).not.toBe(null);
            expect(typeof companies).toBe('object');
            done();
        });
    });
});