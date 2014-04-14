var linkedin = require('../../')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')
token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: People Test Suite', function() {

	it('should retrieve profile of current user', function() {
		linkedin.people.picture = function(cb) {
			this.createCall('GET', 'people/~/picture-urls::(original)', cb)(this.config);
		};

		linkedin.people.picture(function(err, data) {
			expect(err).toBe(null);
			done();
		});
	});

});
