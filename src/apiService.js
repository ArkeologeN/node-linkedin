const request = require('request-promise-native');
const Configuration = require('./configuration');

class APIService {

	constructor() {
		this.baseUrl = 'https://api.linkedin.com/v2';
		this.apiCall = request.defaults({
			baseUrl: this.baseUrl
		});
	}

	/**
	 * Low-level api call executor.
	 *
	 * @returns {function({method: *, url: *, opts: {})}
	 */
	get request() {
		return ({method = 'GET', url = '/', opts = {}, body = {}}) => {
			const isTokenRequired = opts.tokenRequired || true;
			const params = {
				method,
				url,
				timeout: opts.timeout || 60 * 1000,
				headers: {}
			};
			if (opts.baseUrl) {
				params.baseUrl = opts.baseUrl;
			}
			if (method === 'POST' && Object.keys(body).length > 0) {
				const formType = opts.formType === 'form' ? 'form' : 'json';
				params[formType] = body;
			}

			const query = {
				strict: opts.strict || false,
				format: opts.format || 'json'
			};
			if (opts.json) params.json = opts.json;
			const [accessToken] = [this.configuration.value('accessToken')];
			if (isTokenRequired) {
				if (!accessToken) {
					throw new Error('Please retrieve an `accessToken` first');
				}
				if (accessToken.version === 1) {
					params.headers['oauth_token'] = accessToken.token;
				}
				if (accessToken.version === 2 && accessToken.type === 'server') {
					query['oauth2_access_token'] = accessToken.token;
				}
				if (accessToken.version === 2 && accessToken.type !== 'server') {
					params.headers['Authorization'] = `Bearer ${accessToken.token}`;
					params.headers['x-li-src'] = 'msdk';
				}
			}

			params.qs = query;
			return this.apiCall(params);
		}
	}

	get get() {
		return ({url, opts}) => {
			return this.request({method: 'GET', url, opts: opts || {}});
		}
	}

	/**
	 * Invokes POST call
	 * @returns {function({url: *, opts: *, body: *})}
	 */
	get post() {
		/**
		 * Executes `POST` call to the api.
		 *
		 * @param {String}  url
		 * @param {Object} opts
		 * @param {String} [opts.formType=json] - Set to `form` if want to send payload (Defaults: json)
		 * @param {Object} body
		 * @returns {Promise}
		 */
		return ({url, opts = {}, body = {}}) => {
			return this.request({method: 'POST', url, opts, body});
		};
	}

	/**
	 * Returns the singleton instance of configuration.
	 * @returns {Configuration}
	 */
	get configuration() {
		return Configuration.getInstance();
	}
}

module.exports = APIService;