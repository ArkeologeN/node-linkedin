const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const OrganizationEntity = require('../../../src/services/organizationEntity');
const ApiService = require('../../../src/apiService');
chai.use(require('chai-as-promised'));

describe('#organizationEntity', () => {

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

    it('should have a method `organizationAccessControlInfo`', () => {
	    expect(organizationEntity.organizationAccessControlInfo).to.be.a('function');
    });

	  context('When `memberAccessControlInfo` method is called', () => {
		  const [role, state, projection] = ['ADMINISTRATOR', 'APPROVED', '(elements*(*,roleAssignee~(localizedFirstName, localizedLastName), organizationalTarget~(localizedName)))'];

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

		  it('should invoke `request` with role, state and projection', async () => {
			  const expectedUrl = `/organizationalEntityAcls?q=roleAssignee&role=${role}&state=${state}&projection=${projection}`;
			  await organizationEntity.memberAccessControlInfo({role, state, projection});
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

	  context('When `organizationAccessControlInfo` method is called', () => {
		  const [organizationalTarget, role, state] = ['urn:li:organization:1337','ADMINISTRATOR', 'APPROVED'];

		  it('should raise an exception for missing `organizationTarget`', async () => {
			  const wrapFn = () => organizationEntity.organizationAccessControlInfo();
			  expect(wrapFn).to.throw(/organizationTarget/);
		  });

		  it('should invoke `request` with organizationTarget', async () => {
		  	const expectedUrl = `/organizationalEntityAcls?q=organizationalTarget&organizationalTarget=${organizationalTarget}`;
		  	await organizationEntity.organizationAccessControlInfo({organizationalTarget});
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

		  it('should invoke `request` with organizationTarget & role', async () => {
			  const expectedUrl = `/organizationalEntityAcls?q=organizationalTarget&organizationalTarget=${organizationalTarget}&role=${role}`;
			  await organizationEntity.organizationAccessControlInfo({organizationalTarget, role});
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

		  it('should invoke `request` with organizationTarget, role and state', async () => {
			  const expectedUrl = `/organizationalEntityAcls?q=organizationalTarget&organizationalTarget=${organizationalTarget}&role=${role}&state=${state}`;
			  await organizationEntity.organizationAccessControlInfo({organizationalTarget, role, state});
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