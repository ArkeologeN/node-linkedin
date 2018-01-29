const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Organization = require('../../../src/services/organization');
const ApiService = require('../../../src/apiService');
chai.use(require('chai-as-promised'));

describe('#organization', () => {
  
  it('should be extended with `APIService`', () => {
    expect(Organization.prototype).to.be.an.instanceOf(ApiService);
  });
  
  context('When initiated as object', () => {
    
    let organization, sandbox;
    beforeEach(() => {
      organization = new Organization();
	    sandbox = sinon.createSandbox();
	    const requestStub = sinon.stub();
	    sandbox.stub(organization, 'request').value(requestStub);
    });

	  afterEach(() => {
		  sandbox.restore();
	  });


	  it('should have `getter` for fields', () => {
      expect(organization.fields).to.be.an('array');
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
      expect(organization.fields).to.deep.equal(expectedFields);
    });
    
    it('should have a method `id`', () => {
      expect(organization.id).to.be.a('function');
    });

	  it('should have a method `vanityName`', () => {
		  expect(organization.vanityName).to.be.a('function');
	  });

	  it('should have a method `emailDomain', () => {
	  	expect(organization.emailDomain).to.be.a('function');
	  });

	  it('should have a method `associatedWithMember', () => {
	  	expect(organization.associatedWithMember).to.be.a('function');
	  });
    
    it('should have a method `stats`', () => {
      expect(organization.stats).to.be.a('function');
    });
  
    it('should have a method `followerStats`', () => {
      expect(organization.followerStats).to.be.a('function');
    });
  
    it('should have a method `statusUpdateStats`', () => {
      expect(organization.statusUpdateStats).to.be.a('function');
    });

    context('When setter `fields` is called', () => {
      const expectedFields = ['id'];
      beforeEach(() => {
        organization.fields = expectedFields;
      });
      
      it('should update fields reference', () => {
        expect(organization._fields).to.deep.equal(expectedFields);
      });
    });
    
    context('When `id` method is called', () => {
      const fakeId = 'fake-id';
      
      it('should call `request` with correct parameters', async () => {
        const expectedUrl = `/organizations/${fakeId}`;
        await organization.id(fakeId);
        expect(organization.request.args).to.deep.equal([
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
  
    context('When `vanityName` method is called', () => {
		  const name = 'Linkedin';

		  it('should call `request` with correct parameters', async () => {
			  const expectedUrl = `/organizations?q=vanityName&vanityName=${name}`;
			  await organization.vanityName(name);
			  expect(organization.request.args).to.deep.equal([
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

	  context('When `emailDomain` method is called', () => {
		  const domain = 'Linkedin';
		  it('should call `request` with correct parameters', async () => {
			  const expectedUrl = `/organizations?q=emailDomain&emailDomain=${domain}`;
			  await organization.emailDomain(domain);
			  expect(organization.request.args).to.deep.equal([
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

	  context('When `associatedWithMember` method is called', () => {
		  const memberId = 'member-id';
		  it('should call `request` with correct parameters', async () => {
			  const expectedUrl = `/people/id=${memberId}?fields=positions:($*:(company))`;
			  await organization.associatedWithMember(memberId);
			  expect(organization.request.args).to.deep.equal([
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

    context.skip('When `stats` method is called', () => {
      let sandbox;
      const fakeId = 'fake-id';
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        const requestStub = sinon.stub();
        sandbox.stub(organization, 'request').value(requestStub);
      });
      afterEach(() => {
        sandbox.restore();
      });
    
      it('should call `request` with correct parameters', async () => {
        const expectedUrl = `/companies/${fakeId}/company-statistics`;
        await organization.stats(fakeId);
        expect(organization.request.args).to.deep.equal([
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
  
    context.skip('When `followerStats` method is called', () => {
      let sandbox;
      const fakeId = 'fake-id';
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        const requestStub = sinon.stub();
        sandbox.stub(organization, 'request').value(requestStub);
      });
      afterEach(() => {
        sandbox.restore();
      });
    
      it('should call `request` with id', async () => {
        const expectedUrl = `/companies/${fakeId}/historical-follow-statistics`;
        await organization.followerStats({id: fakeId});
        expect(organization.request.args).to.deep.equal([
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
        await organization.followerStats({id: fakeId, start: start});
        expect(organization.request.args).to.deep.equal([
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
        await organization.followerStats({id: fakeId, start, end});
        expect(organization.request.args).to.deep.equal([
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
  
    context.skip('When `statusUpdateStats` method is called', () => {
      let sandbox;
      const fakeId = 'fake-id';
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        const requestStub = sinon.stub();
        sandbox.stub(organization, 'request').value(requestStub);
      });
      afterEach(() => {
        sandbox.restore();
      });
    
      it('should call `request` with id', async () => {
        const expectedUrl = `/companies/${fakeId}/historical-status-update-statistics`;
        await organization.statusUpdateStats({id: fakeId});
        expect(organization.request.args).to.deep.equal([
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
        await organization.statusUpdateStats({id: fakeId, start: start});
        expect(organization.request.args).to.deep.equal([
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
        await organization.statusUpdateStats({id: fakeId, start, end});
        expect(organization.request.args).to.deep.equal([
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