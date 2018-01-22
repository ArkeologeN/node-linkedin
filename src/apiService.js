const request = require('request-promise-native');
const Configuration = require('./configuration');

class APIService {
  
  constructor() {
    this.baseUrl = 'https://api.linkedin.com/v1';
    this.apiCall = request.defaults({
      baseUrl: this.baseUrl
    });
  }
  
  /**
   * Low-level api call executor.
   *
   * @returns {function({method: *, url: *, opts: *})}
   */
  get request() {
    return ({method = 'GET', url = '/', opts = {}}) => {
      const configuration = Configuration.getInstance();
      const params = {
        method,
        url,
        timeout: opts.timeout || 60 * 1000,
        headers: {},
      };
      const query = {
        strict: opts.strict || false,
        format: opts.format || 'json'
      };
      if (opts.json) params.json = opts.json;
      const [accessToken] = [configuration.value('accessToken')];
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
      params.qs = query;
      return this.apiCall(params);
    }
  }
  
  get get() {
    return ({url, opts}) => {
      return this.request({method: 'GET', url, opts: opts || {}});
    }
  }
}

module.exports = APIService;