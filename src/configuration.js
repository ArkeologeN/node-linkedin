let instance = null;

class Configuration {

	constructor() {
		this.settings = {};
	}

	/**
	 * Returns the value from the singleton settings.
	 *
	 * @returns {function(String)}
	 * @example
	 *
	 *  Configuration.getInstance().get('access_token); // returns value.
	 */
	get value() {
		return (key) => {
			return this.settings[key];
		}
	}

	/**
	 * Singleton to hold configuration.
	 *
	 * @returns {Configuration}
	 */
	static getInstance() {
		if (!(instance instanceof Configuration)) {
			instance = new Configuration();
		}
		return instance;
	}

	/**
	 * Sets a configuration value over Singleton.
	 *
	 * @param {String} key
	 * @param {*} value
	 * @returns {Configuration}
	 * @example
	 *
	 *  Configuration.getInstance().set('access_token', 'fake-token');
	 */
	set(key, value) {
		this.settings[key] = value;
		return this;
	}
}

module.exports = Configuration;