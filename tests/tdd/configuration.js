const expect = require('chai').expect;
const Configuration = require('../../src/configuration');

describe('#configuraiton', () => {
  
  context('When `getInstance` is called', () => {
    let configuration;
    before(() => {
      configuration = Configuration.getInstance();
  
    });
    
    it('should be a shared instance', () => {
      expect(configuration).to.be.an.instanceOf(Configuration);
    });
    
    it('should have `settings` public property', () => {
      expect(configuration.settings).to.be.an('object');
    });
    
    it('should have a `set` method', () => {
      expect(configuration.set).to.be.a('function');
    });
    
    it('should have a getter for `value`', () => {
      expect(configuration.value).to.be.a('function');
    });
    
    context('When `set` method is called', () => {
      /**
       *
       * @type {Configuration}
       */
      let configuration = null;
      let key, value;
      before(() => {
        [key, value] = ['access_token', {}];
        configuration = Configuration.getInstance();
        
      });
      it('should set a key/value over `settings`', () => {
        configuration.set(key, value);
        expect(configuration.settings[key]).to.equal(value);
      });
      
      it('should return `this` as configuration instance', () => {
        expect(configuration.set('a', 'b')).to.be.an.instanceOf(Configuration);
      });
      
      it('should overwrite the existing value', () => {
        const changedValue = {version: 2};
        configuration.set(key, value);
        expect(configuration.settings[key]).to.equal(value);
        configuration.set(key, changedValue);
        expect(configuration.settings[key]).to.equal(changedValue);
      });
    });
    
    context('When getter `value` is called', () => {
      let key, value;
      beforeEach(() => {
        [key, value] = ['access_token', {}];
        configuration.set(key, value);
      });
      
      it('should return the function', () => {
        expect(configuration.value).to.be.a('function');
      });
      
      it('should expect one (1) argument exactly', () => {
        expect(configuration.value.length).to.equal(1);
      });
      
      it('should return value by the given key', () => {
        expect(configuration.value(key)).to.equal(value);
      });
    });
  });
});