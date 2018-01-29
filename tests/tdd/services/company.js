const nock = require('nock');
const sinon = require('sinon');
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
    
    it('should have a method `stats`', () => {
      expect(company.stats).to.be.a('function');
    });
  
    it('should have a method `followerStats`', () => {
      expect(company.followerStats).to.be.a('function');
    });
  
    it('should have a method `statusUpdateStats`', () => {
      expect(company.statusUpdateStats).to.be.a('function');
    });
    
    it('should have a method `name`', () => {
      expect(company.name).to.be.a('function');
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
        const expectedUrl = `/companies/${fakeId}:(${company.fields.join(',')})`;
        await company.id(fakeId);
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    });
  
    context('When `name` method is called', () => {
      let sandbox;
      const name = 'fake-name';
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        const requestStub = sinon.stub();
        sandbox.stub(company, 'request').value(requestStub);
      });
      afterEach(() => {
        sandbox.restore();
      });
    
      it('should call `request` with correct parameters', async () => {
        const expectedUrl = `/companies/universal-name=${name}:(${company.fields.join(',')})`;
        await company.name(name);
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    });
  
    context('When `stats` method is called', () => {
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
        const expectedUrl = `/companies/${fakeId}/company-statistics`;
        await company.stats(fakeId);
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    });
  
    context('When `followerStats` method is called', () => {
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
    
      it('should call `request` with id', async () => {
        const expectedUrl = `/companies/${fakeId}/historical-follow-statistics`;
        await company.followerStats({id: fakeId});
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
  
      it('should call `request` with id and start.', async () => {
        const start = +new Date();
        const expectedUrl = `/companies/${fakeId}/historical-follow-statistics?time-granularity=day&start-timestamp=${start}`;
        await company.followerStats({id: fakeId, start: start});
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
  
      it('should call `request` with id, start and end.', async () => {
        const start = +new Date();
        const end = +new Date();
        const expectedUrl = `/companies/${fakeId}/historical-follow-statistics?time-granularity=day&start-timestamp=${start}&end-timestamp=${end}`;
        await company.followerStats({id: fakeId, start, end});
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    });
  
    context('When `statusUpdateStats` method is called', () => {
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
    
      it('should call `request` with id', async () => {
        const expectedUrl = `/companies/${fakeId}/historical-status-update-statistics`;
        await company.statusUpdateStats({id: fakeId});
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    
      it('should call `request` with id and start.', async () => {
        const start = +new Date();
        const expectedUrl = `/companies/${fakeId}/historical-status-update-statistics?time-granularity=day&start-timestamp=${start}`;
        await company.statusUpdateStats({id: fakeId, start: start});
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    
      it('should call `request` with id, start and end.', async () => {
        const start = +new Date();
        const end = +new Date();
        const expectedUrl = `/companies/${fakeId}/historical-status-update-statistics?time-granularity=day&start-timestamp=${start}&end-timestamp=${end}`;
        await company.statusUpdateStats({id: fakeId, start, end});
        expect(company.request.args).to.deep.equal([
          [
            {
              method: 'GET',
              opts: {},
              url: expectedUrl
            }
          ]
        ]);
      });
    });
  });
});