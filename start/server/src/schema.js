/*

In src/schema.js, import  gql from Apollo Server and create a variable called typeDefs for your schema. Your schema will go inside the gql function (between the backticks in this portion: gql``). 

Make sure to export typeDegs

*/

const { gql } = require('apollo-server');
const typeDefs = gql`

type Query {
    launches: [Launch]!
    launch(id: ID!): Launch

    # Queries for the current user
    me: User
}

type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!

}


type User {
    id: ID!
    email: String!
    trips: [Launch]!
}


type Rocket {
    id: ID!
    name: String
    type: String
}

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}

type Mutation {
    # if false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    # login token
    login(email: String): String
}
`;


module.exports = typeDefs;