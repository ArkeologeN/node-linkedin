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

    it('should get the statistics for a company by the given id', function(done) {
        linkedin.companies.company_stats('162479', function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            done();
        });
    });

    it('should get the historical follower count for a company by the given id', function(done) {
        linkedin.companies.company_historical_follower_stats('162479', 1418117379000, 1449665843000, function(err, company) {
            expect(err).toBe(null);
            expect(company).not.toBe(null);
            expect(typeof company).toBe('object');
            done();
        });
    });

    it('should get the historical impressions count for a company by the given id', function(done) {
        linkedin.companies.company_historical_status_update_stats('162479', 1418117379000, 1449665843000, function(err, company) {
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

    it('should get recent company updates by company id', function (done) {
        linkedin.companies.updates(1337, function (err, updates) {
          expect(err).toBe(null);
          expect(updates).not.toBe(null);
          expect(typeof updates).toBe('object');
          done();
        });
    });

    it('should get recent company updates by company id', function (done) {
        linkedin.companies.getUpdate(1337, 'UPDATE-c1337-998877665544332211', function (err, updates) {
          expect(err).toBe(null);
          expect(updates).not.toBe(null);
          expect(typeof updates).toBe('object');
          done();
        });
    });
    
    it('should should share a company update by company id', function (done) {
        linkedin.companies.share(2414183, {
            "comment": "Check out the LinkedIn Pages Share API!",
            "content": {
                "title": " LinkedIn Developers Documentation On Using the Share API ",
                "description": " Leverage the Share API to maximize engagement on user-generated content on LinkedIn",
                "submitted-url": " https://developer.linkedin.com/docs/company-pages ",
                "submitted-image-url": " https://m3.licdn.com/media/p/3/000/124/1a6/089a29a.png"
            },
            "visibility": { "code": "anyone" }
          }, function (err, share) {
          expect(err).toBe(null);
          expect(share).not.toBe(null);
          expect(typeof share).toBe('object');
          done();
        });
    });
});
