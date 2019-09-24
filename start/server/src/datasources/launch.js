const { RESTDataSource } = require('apollo-datasource-rest');


class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }

    // Write Data Fetching Methods
    async getAllLaunches() {
        // first, get the launch data
        const response = await this.get('launches');

        // if response is an array, pass in each launch in this.launchReducer, if not, return []
        return Array.isArray(response) ? response.map(launch => this.launchReducer(launch)) : [];
    }

}

module.exports = LaunchAPI;