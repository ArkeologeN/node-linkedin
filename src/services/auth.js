const APIService = require('../apiService');

class Auth extends APIService {

	getAuthorizationUrl({scopes, redirectUri, state}) {
		if (!scopes) {
			throw new Error(`[getAuthorizationUrl] scopes is required`);
		}

		if (!Array.isArray(scopes)) {
			throw new Error(`[getAuthorizationUrl] scopes should be an array`);
		}

		if (!redirectUri) {
			throw new Error(`[getAuthorizationUrl] redirectUri is required`);
		}

		if (!state) {
			throw new Error(`[getAuthorizationUrl] state is required`);
		}

		const clientId = this.configuration.value('clientId');
		if (!clientId) {
			throw new Error(`[getAuthorizationUrl:Configuration] clientId is required`);
		}

		scopes = encodeURIComponent(scopes.join(','));
		redirectUri = encodeURIComponent(redirectUri);
		return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&state=${state}&scope=${scopes}&redirect_uri=${redirectUri}`;
	}

	getAccessToken({code, redirectUri}) {
		if (!code) {
			throw new Error(`[getAccessToken] code is required`);
		}

		if (!redirectUri) {
			throw new Error(`[getAccessToken] redirectUri is required`);
		}

		const [clientId, clientSecret] = [
			this.configuration.value('clientId'),
			this.configuration.value('clientSecret')
		];

		const body = {
			grant_type: 'authorization_code',
			code,
			redirect_uri: redirectUri,
			client_id: clientId,
			client_secret: clientSecret
		};
		const opts = {
			formType: 'form',
			tokenRequired: false,
			baseUrl: 'https://www.linkedin.com'
		};
		const url = `/oauth/v2/accessToken`;

		return this.post({url, body, opts});
	}
}

module.exports = Auth;