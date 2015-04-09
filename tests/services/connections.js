;(function() {
  'use strict';

  var expect = require('chai').expect,
      Base = require('../../lib/base'),
      Connections = require('../../lib/services/connections');

  describe('#service', function() {
    describe('connections', function() {

      it('should be exported fine', function() {
        expect(Connections).to.be.ok;
      });

      it('should invoke constructor for new instance', function() {
        var connections = new Connections({});
        expect(connections).to.be.an.instanceOf(Connections);
      })

      describe('~methods', function() {
        var connections;
        before(function() {
          connections = new Connections({
            apiUrl: "https://api.linkedin.com/v1/",
            format: 'json'
          });
        });
        describe('`retrieve`', function() {
          it('should exists', function() {
            expect(connections.retrieve).to.be.an.instanceOf(Function);
          });

          it('should throw Error if callback is missing', function() {
            try {
              connections.retrieve();
            } catch(e) {
              expect(e).to.be.an.instanceOf(Error);
              expect(e.message).to.equals('callback function is required.');
            }
          });

          it('should be executed successfully', function(done) {
            connections.retrieve('people/~/connections', {}, function(err, ok) {
              // FIXME: Check for response
              done();
            });
          });
        });
      });
    });
  })
})();
