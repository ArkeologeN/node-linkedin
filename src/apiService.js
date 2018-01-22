const request = require('request-promise-native');

class APIService {

    constructor() {
        this.apiCall = request.defaults({
            baseUrl: 'https://api.linkedin.com/v1',
           json: true
        });
    }

    get request() {

    }

    get get() {
        return ({method, url}) => {

        }
    }
}

module.exports = APIService;