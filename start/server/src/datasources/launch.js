const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v2/";
  }

  // Write Data Fetching Methods
  async getAllLaunches() {
    // first, get the launch data
    // GET req to https://api.spacexdata.com/v2/launches
    // and stores the returned launches in the response variable
    const response = await this.get("launches");

    // if response is an array, pass in and transform each launch in this.launchReducer, if not, return []
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  // launchReducer func to transform the data into shape of our Launch schema (id, site, mission, rocket, isBooked from schema.js)
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type
      }
    };
  }

  // getLaunchById method takes in a flight number and returns the data for a particular launch
  async getLaunchById({ launchId }) {
    const response = await this.get("launches", { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  // getLaunchesByIds returns several launches based on their respective launchIds
  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  }

}

module.exports = LaunchAPI;
