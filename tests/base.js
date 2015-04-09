;(function() {
  'use strict';

  var Base = require('../lib/base'),
      expect = require('chai').expect;

  describe('#core', function() {

    describe('base', function() {

      var base;
      beforeEach(function() {
        base = new Base({
          apiUrl: "https://api.linkedin.com/v1/",
          format: 'json'
        });
      });

      it('should export it fine', function() {
        expect(Base).to.be.an.instanceOf(Function);
      });

      it('should set config as property', function() {
        expect(base._config).to.be.an.instanceOf(Object);
      });

      describe('`createCall` method', function() {
        it('should be defined', function() {
          expect(base.createCall).to.be.an.instanceOf(Function);
        });

        it('should throw Error if callback is undefined', function() {
          try {
            base.createCall('GET', 'hello/world', {});
          } catch (e) {
            expect(e.message).to.equals('callback function is required and missing.');
          }
        });

        it('should test for valid object properties', function(done) {
          try {
            base.createCall('GET', 'hello/world', {}, function(err, ok) {
              done();
            });
          } catch (e) {
            console.log(e.stack);
          }
        });
      });
    });
  });

})();
