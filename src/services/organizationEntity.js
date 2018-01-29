const APIService = require('../apiService');

class OrganizationEntity extends APIService {

	memberAccessControlInfo({role, state} = {}) {
		let query = ['q=roleAssignee'];
		if (role) {
			query.push(`role=${role}`);
		}
		if (state) {
			query.push(`state=${state}`);
		}
		let url = `/organizationalEntityAcls?` + query.join('&');
		return this.get({url});
	}
}

module.exports = OrganizationEntity;