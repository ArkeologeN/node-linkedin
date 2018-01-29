const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const OrganizationBrand = require('../../../src/services/organizationBrand');
const ApiService = require('../../../src/apiService');
chai.use(require('chai-as-promised'));

describe('#organizationBrand', () => {

  it('should be extended with `APIService`', () => {
    expect(OrganizationBrand.prototype).to.be.an.instanceOf(ApiService);
  });
  
  context('When initiated as object', () => {
    
    let organizationBrand, sandbox;
    beforeEach(() => {
      organizationBrand = new OrganizationBrand();
	    sandbox = sinon.createSandbox();
	    const requestStub = sinon.stub();
	    sandbox.stub(organizationBrand, 'request').value(requestStub);
    });

	  afterEach(() => {
		  sandbox.restore();
	  });


    it('should have a method `id`', () => {
      expect(organizationBrand.id).to.be.a('function');
    });

	  it('should have a method `vanityName`', () => {
		  expect(organizationBrand.vanityName).to.be.a('function');
	  });

	  it('should have a method `childrenOf`', () => {
		  expect(organizationBrand.childrenOf).to.be.a('function');
	  });

	  context('When `id` method is called', () => {
		  const brandId = '11111111';
		  it('should call `request` with correct parameters', async () => {
			  const expectedUrl = `/organizationBrands/${brandId}`;
			  await organizationBrand.id(brandId);
			  expect(organizationBrand.request.args).to.deep.equal([
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
			  const expectedUrl = `/organizationBrands?q=vanityName&vanityName=${name}`;
			  await organizationBrand.vanityName(name);
			  expect(organizationBrand.request.args).to.deep.equal([
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

	  context('When `childrenOf` method is called', () => {
		  const urn = 'urn:li:organization:1337:';
		  it('should call `request` with correct parameters', async () => {
			  const expectedUrl = `/organizations?q=parentOrganization&parent=${urn}`;
			  await organizationBrand.childrenOf(urn);
			  expect(organizationBrand.request.args).to.deep.equal([
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