module.exports = {
    Query: {
      launches: (_, __, { dataSources }) => // 1st arg blank (parent), 2nd arg blank (args)
        dataSources.launchAPI.getAllLaunches(),
      launch: (_, { id }, { dataSources }) =>
        dataSources.launchAPI.getLaunchById({ launchId: id }),
      me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
  };