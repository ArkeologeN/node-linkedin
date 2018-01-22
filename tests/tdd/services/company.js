const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Company = require('../../../src/services/company');
const ApiService = require('../../../src/apiService');
const Configuration = require('../../../src/configuration');
chai.use(require('chai-as-promised'));

describe.only('#company', () => {
  
  it('should be extended with `APIService`', () => {
    expect(Company.prototype).to.be.an.instanceOf(ApiService);
  });
  
  context('When initiated as object', () => {
    
    let company;
    beforeEach(() => {
      company = new Company();
    });
    
    it('should have `getter` for fields', () => {
      expect(company.fields).to.be.an('array');
    });
    
    it('should return array of fields with `fields` getter', () => {
      const expectedFields = [
        'id', 'name', 'universal-name',
        'email-domains', 'company-type',
        'ticker', 'website-url', 'industries',
        'status', 'logo-url', 'twitter-id',
        'employee-count-range', 'specialties', 'locations',
        'description', 'stock-exchange', 'founded-year',
        'end-year', 'num-followers'
      ];
      expect(company.fields).to.deep.equal(expectedFields);
    });
    
    it('should have a method `id`', () => {
      expect(company.id).to.be.a('function');
    });
    
    context('When setter `fields` is called', () => {
      const expectedFields = ['id'];
      beforeEach(() => {
        company.fields = expectedFields;
      });
      
      it('should update fields reference', () => {
        expect(company._fields).to.deep.equal(expectedFields);
      });
    });
    
    context('When `id` method is called', () => {
      let sandbox;
      const fakeId = 'fake-id';
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        const requestStub = sinon.stub();
        sandbox.stub(company, 'request').value(requestStub);
      });
      afterEach(() => {
        sandbox.restore();
      });
      
      it('should call `request` with correct parameters', async () => {
        await company.id(fakeId);
        console.log(company.request.args);
      });
    });
  });
});