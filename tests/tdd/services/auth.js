const nock = require('nock');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Auth = require('../../../src/services/auth');
const APIService = require('../../../src/apiService');
const Configuration = require('../../../src/configuration');
chai.use(require('chai-as-promised'));

describe('#auth', () => {

	it('should be extended with `APIService`', () => {
		expect(Auth.prototype).to.be.an.instanceOf(APIService);
	});

	context('When object is initialized', () => {

		let auth;
		beforeEach(() => {
			auth = new Auth();
		});

		it('should have a metho' +
			'd `getAuthorizationUrl()', () => {
			expect(auth.getAuthorizationUrl).to.be.a('function');
		});
		it('should have a method `getAccessToken', () => {
			expect(auth.getAccessToken).to.be.a('function');
		})

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

		context('When method `getAccessToken` is called', () => {
			[
				{
					title: 'with no arguments',
					input: {},
					output: /(=?code)(.*required)/
				},
				{
					title: 'with code but no redirectUri',
					input: {
						code: 'fake-code'
					},
					output: /(=?redirectUri)(.*required)/
				},
			].forEach(testCase => {
				context(testCase.title, () => {
					it('should raise an exception', () => {
						const inputFn = () => auth.getAccessToken(testCase.input);
						return expect(inputFn).to.throw(testCase.output);
					});
				});
			});

			context('with valid arguments', () => {
				let [accessTokenNock, code, redirectUri, clientId, clientSecret, accessToken, expiresIn] = [
					null,
					'fake-code',
					'http://local.example.com/auth/callback',
					'fake-client-id',
					'fake-client-secret',
					'fake-access-token',
					6000 * 1000
				];
				let result = null;
				before(async () => {
					Configuration
						.getInstance()
						.set('clientId', clientId)
						.set('clientSecret', clientSecret);
					accessTokenNock = nock('https://www.linkedin.com')
						.post('/oauth/v2/accessToken', {
							grant_type: 'authorization_code',
							code,
							redirect_uri: redirectUri,
							client_id: clientId,
							client_secret: clientSecret
						})
						.query({
							format: 'json',
							strict: false
						})
						.reply(200, {
							access_token: accessToken,
							expires_in: expiresIn
						});
					result = await auth.getAccessToken({code, redirectUri});
				});

				it('should have made POST call to api', () => {
					expect(accessTokenNock.isDone()).to.equal(true);
				});
			});
		});
	});
});