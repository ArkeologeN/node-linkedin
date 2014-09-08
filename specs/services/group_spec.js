/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   9/8/14
 */

var linkedin = require('../../')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5'),
    token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: Group Test Suite', function() {

    it('should retrieve recent feeds from group by id', function(done) {
        linkedin.group.feeds(3769732, function(err, data) {
            expect(err).toBe(null);
            expect(typeof data).toBe('object');
            expect(data._count).toBeDefined();
            expect(data._start).toBeDefined();
            done();
        });
    });
});