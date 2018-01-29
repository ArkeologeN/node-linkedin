const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const Configuration = require('../../src/configuration');
const ApiService = require('../../src/apiService');
chai.use(require('chai-as-promised'));

describe('#apiService', () => {
  /**
   *
   * @type {APIService}
   */
  let apiService = null;
  beforeEach(() => {
    apiService = new ApiService();
  });
  
  it('should be able to initialized', () => {
    expect(apiService).to.be.an.instanceOf(ApiService);
  });
  
  it('should have a getter for `request`', () => {
    expect(apiService).to.have.deep.property('request');
  });
  
  it('should have a getter for `get`', () => {
    expect(apiService.get).to.be.a('function');
  });
  
  it('should have initialized `apiCall` property', () => {
    expect(apiService.apiCall).to.be.a('function');
  });
  
  context('When getter `request` is called', () => {
    
    it('should export a function over context', () => {
      expect(apiService.request).to.be.a('function');
    });
    
    it('should expect one (1) arguments as spread object exactly', () => {
      expect(apiService.request.length).to.equal(1);
    });
    
    it('should throw error if `accessToken` is not available.', () => {
      expect(apiService.request.bind(apiService, [{}])).to.throw(/accessToken/);
    });
    
    context('When token version is `1`', () => {
      let [inRequestNock, accessToken] = [{}, {}];
      before(() => {
        accessToken = {
          version: 1,
          token: 'fake-token'
        };
        Configuration.getInstance().set('accessToken', accessToken);
        inRequestNock = nock(apiService.baseUrl, {
          reqheaders: {
            oauth_token: new RegExp(accessToken.token, 'ig'),
            host: /linkedin/
          }
        })
          .get('/')
          .query({strict: false, format: 'json'})
          .reply(200, {
            hello: 'world'
          });
      });
      
      it('should place token in header', async () => {
        await apiService.request({url: '/'});
        expect(inRequestNock.isDone()).to.equal(true);
      });
    });
    
    context('When token version is `2` and type is `server`', () => {
      let [inRequestNock, accessToken] = [{}, {}];
      before(() => {
        accessToken = {
          version: 2,
          token: 'fake-token',
          type: 'server'
        };
        Configuration.getInstance().set('accessToken', accessToken);
        inRequestNock = nock(apiService.baseUrl, {
          reqheaders: {
            host: /linkedin/
          }
        })
          .get('/')
          .query({strict: false, format: 'json', oauth2_access_token: accessToken.token})
          .reply(200, {
            hello: 'world'
          });
      });
      
      it('should place token in header', async () => {
        await apiService.request({url: '/'});
        expect(inRequestNock.isDone()).to.equal(true);
      });
    });
    
    context('When token version is `2` and type is NOT `server`', () => {
      let [inRequestNock, accessToken] = [{}, {}];
      before(() => {
        accessToken = {
          version: 2,
          token: 'fake-token',
          type: null
        };
        Configuration.getInstance().set('accessToken', accessToken);
        inRequestNock = nock(apiService.baseUrl, {
          reqheaders: {
            authorization: `Bearer ${accessToken.token}`,
            'x-li-src': 'msdk',
            host: /linkedin/
          }
        })
          .get('/')
          .query({strict: false, format: 'json'})
          .reply(200, {
            hello: 'world'
          });
      });
      
      it('should place token in header', async () => {
        await apiService.request({url: '/'});
        expect(inRequestNock.isDone()).to.equal(true);
      });
    });
  });
  
  context('When getter `get` is called', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      const requestStub = sinon.stub();
      sandbox.stub(apiService, 'request').value(requestStub);
    });
    afterEach(() => {
      sandbox.restore();
    });
    
    it('should invoke `request` getter with method: GET', async () => {
      const [url, opts] = ['/', {format: 'xml'}];
      await apiService.get({url, opts});
      expect(apiService.request.callCount).to.equal(1);
      expect(apiService.request.args).to.deep.equal([[
        {
          method: 'GET',
          url,
          opts
        }
      ]]);
    });
  });

	context('When getter `post` is called', () => {
		let sandbox;
		beforeEach(() => {
			sandbox = sinon.createSandbox();
			const requestStub = sinon.stub();
			sandbox.stub(apiService, 'request').value(requestStub);
		});
		afterEach(() => {
			sandbox.restore();
		});

		it('should invoke `request` getter with method: POST', async () => {
			const [url, opts, body] = ['/', {}, {foo: 'bar'}];
			await apiService.post({url, opts, body});
			expect(apiService.request.callCount).to.equal(1);
			expect(apiService.request.args).to.deep.equal([[
				{
					method: 'POST',
					url,
					opts,
					body
				}
			]]);
		});
	});
});