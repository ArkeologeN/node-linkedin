const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Auth = require('../../../src/services/auth');
const APIService = require('../../../src/apiService');
const Configuration = require('../../../src/configuration');
chai.use(require('chai-as-promised'));

describe.only('#auth', () => {

	it('should be extended with `APIService`', () => {
		expect(Auth.prototype).to.be.an.instanceOf(APIService);
	});

	context('When object is initialized', () => {

		let auth;
		beforeEach(() => {
			auth = new Auth();
		});

		it('should have a method `getAuthorizationUrl()', () => {
			expect(auth.getAuthorizationUrl).to.be.a('function');
		});

		context('When method `getAuthorizationUrl` is called', () => {

			[
				{
					title: 'with no arguments',
					input: {},
					output: /(=?scopes)(.*required)/
				},
				{
					title: 'with scopes is not an array',
					input: {
						scopes: 'fake-string'
					},
					output: /(=?scopes)(.*array)/
				},
				{
					title: 'with scopes but no redirectUri',
					input: {
						scopes: ['r_profile']
					},
					output: /(=?redirectUri)(.*required)/
				},
				{
					title: 'with scopes & redirectUri but no state',
					input: {
						scopes: ['r_profile'],
						redirectUri: 'http://someuri.com'
					},
					output: /(=?state)(.*required)/
				}
			].forEach(testCase => {
				context(testCase.title, () => {
					it('should raise an exception', () => {
						const inputFn = () => auth.getAuthorizationUrl(testCase.input);
						return expect(inputFn).to.throw(testCase.output);
					});
				});
			});

			context('with valid arguments', () => {
				let [url, scopes, state, redirectUri, clientId] = [
					null,
					['r_basicprofile', 'w_share'],
					[Math.random() * 100 | 0, +new Date()].join('|'),
					'http://local.example.com/auth/callback',
					'fake-client-id'
				];
				before(() => {
					Configuration.getInstance().set('clientId', clientId);
					url = auth.getAuthorizationUrl({scopes, redirectUri, state});
				});

				it('should return a valid url', () => {

					const expectedUrl = `https://www.linkedin.com/oauth/v2/authorization?` + [
						`response_type=code`,
						`client_id=${clientId}`,
						`state=${state}`,
						`scope=${encodeURIComponent(scopes)}`,
						`redirect_uri=${encodeURIComponent(redirectUri)}`].join('&');
					expect(url).to.equal(expectedUrl);
				});
			});
		});
	});
});