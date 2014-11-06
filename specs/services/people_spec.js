/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/9/14
 */

var linkedin = require('../../')('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')
token = process.env.IN_TOKEN;

jasmine.getEnv().defaultTimeoutInterval = 20000;

linkedin = linkedin.init(token);

describe('API: People Test Suite', function() {

    it('should retrieve profile of current user', function(done) {
        linkedin.people.me(function(err, data) {
            done();
        });
    });

    it('should invite someone to connect', function(done) {
        linkedin.people.invite({
            "recipients": {
                "values": [{
                    "person": {
                        "_path": "/people/email=glavin.wiechert@gmail.com",
                        "first-name": "Glavin",
                        "last-name": "Wiechert"
                    }
                }]
            },
            "subject": "Invitation to connect.",
            "body": "Say yes!",
            "item-content": {
                "invitation-request": {
                    "connect-type": "friend"
                }
            }
        }, function(err, data) {
            done();
        });
    });
});
