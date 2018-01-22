const APIService = require('../apiService');

class Company extends APIService {
  
  constructor() {
    super();
    this._fields = [
      'id', 'name', 'universal-name',
      'email-domains', 'company-type',
      'ticker', 'website-url', 'industries',
      'status', 'logo-url', 'twitter-id',
      'employee-count-range', 'specialties', 'locations',
      'description', 'stock-exchange', 'founded-year',
      'end-year', 'num-followers'
    ];
  }
  
  get fields() {
    return this._fields;
  }
  
  set fields(arr) {
    this._fields = arr;
  }
  
  id(id) {
    const url = `/companies/${id}:(${this.fields.join(',')})`;
    return this.get({url});
  }
}

module.exports = Company;