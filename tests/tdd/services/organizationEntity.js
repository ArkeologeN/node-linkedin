const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const OrganizationEntity = require('../../../src/services/organizationEntity');
const ApiService = require('../../../src/apiService');
chai.use(require('chai-as-promised'));

describe.only('#organizationEntity', () => {

  it('should be extended with `APIService`', () => {
    expect(OrganizationEntity.prototype).to.be.an.instanceOf(ApiService);
  });
  
  context('When initiated as object', () => {
    
    let organizationEntity, sandbox;
    beforeEach(() => {
      organizationEntity = new OrganizationEntity();
	    sandbox = sinon.createSandbox();
	    const requestStub = sinon.stub();
	    sandbox.stub(organizationEntity, 'request').value(requestStub);
    });

	  afterEach(() => {
		  sandbox.restore();
	  });


    it('should have a method `memberAccessControlInfo`', () => {
      expect(organizationEntity.memberAccessControlInfo).to.be.a('function');
    });

	  context('When `memberAccessControlInfo` method is called', () => {
		  const [role, state] = ['ADMINISTRATOR', 'APPROVED'];

		  it('should invoke `request` with no arguments', async () => {
			  const expectedUrl = `/organizationalEntityAcls?q=roleAssignee`;
			  await organizationEntity.memberAccessControlInfo();
			  expect(organizationEntity.request.args).to.deep.equal([
				  [
					  {
						  method: 'GET',
						  opts: {},
						  url: expectedUrl
					  }
				  ]
			  ]);
		  });

		  it('should invoke `request` with role', async () => {
			  const expectedUrl = `/organizationalEntityAcls?q=roleAssignee&role=${role}`;
			  await organizationEntity.memberAccessControlInfo({role});
			  expect(organizationEntity.request.args).to.deep.equal([
				  [
					  {
						  method: 'GET',
						  opts: {},
						  url: expectedUrl
					  }
				  ]
			  ]);
		  });

		  it('should invoke `request` with role & state', async () => {
			  const expectedUrl = `/organizationalEntityAcls?q=roleAssignee&role=${role}&state=${state}`;
			  await organizationEntity.memberAccessControlInfo({role, state});
			  expect(organizationEntity.request.args).to.deep.equal([
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