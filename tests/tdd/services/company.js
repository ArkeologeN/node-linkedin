const nock = require('nock');
const chai = require('chai');
const expect = chai.expect;
const Company = require('../../../src/services/company');
const ApiService = require('../../../src/apiService');
const Configuration = require('../../../src/configuration');
chai.use(require('chai-as-promised'));

describe('#company', () => {

  it('should be extended with `APIService`', () => {
    expect(Company.prototype).to.be.an.instanceOf(ApiService);
  });
  
  
});