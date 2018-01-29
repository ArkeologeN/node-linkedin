const APIService = require('../apiService');

class OrganizationBrand extends APIService {

	id(brandId) {
		const url = `/organizationBrands/${brandId}`;
		return this.get({url});
	}

	vanityName(name) {
		const url = `/organizationBrands?q=vanityName&vanityName=${name}`;
		return this.get({url});
	}

	childrenOf(urn) {
		const url = `/organizations?q=parentOrganization&parent=${urn}`;
		return this.get({url});
	}
}

module.exports = OrganizationBrand;