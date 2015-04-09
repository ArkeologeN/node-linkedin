;(function() {
  'use strict';

  var expect = require('chai').expect;

  describe('#core', function() {

    describe('main', function() {

      it('should be exported on context', function() {
        var LinkedIn = require('../lib/main');
        expect(LinkedIn).to.be.an.instanceOf(Function);
      });

      it('`constructor` should create new object', function() {
        var LinkedIn = require('../lib/main');
        expect(new LinkedIn('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5')).to.be.an.instanceOf(LinkedIn);
      });

      describe('~methods', function() {

        var LinkedIn = require('../lib/main');
        LinkedIn = new LinkedIn('75gyccfxufrozz', 'HKwSAPg0z7oGYfh5');

        it('should have `auth` exported', function() {
          expect(LinkedIn.auth).to.be.ok;
        });

        it('should have `init` and export services', function() {
          console.log(LinkedIn.init());
          expect(LinkedIn.init).be.an.an.instanceOf(Function);

        });
      });
    });
  });
})();
