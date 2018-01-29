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

	name(name) {
		const url = `/companies/universal-name=${name.split(' ').join('-')}:(${this.fields.join(',')})`;
		return this.get({url});
	}

	stats(id) {
		const url = `/companies/${id}/company-statistics`;
		return this.get({url});
	}

	followerStats({id, start, end}) {
		let url = `/companies/${id}/historical-follow-statistics`;
		if (start || end) {
			url += `?time-granularity=day`;
		}
		if (start) {
			url += `&start-timestamp=${start}`;
		}
		if (end) {
			url += `&end-timestamp=${end}`;
		}
		return this.get({url});
	}

	statusUpdateStats({id, start, end}) {
		let url = `/companies/${id}/historical-status-update-statistics`;
		if (start || end) {
			url += `?time-granularity=day`;
		}
		if (start) {
			url += `&start-timestamp=${start}`;
		}
		if (end) {
			url += `&end-timestamp=${end}`;
		}
		return this.get({url});
	}
}

module.exports = Company;