// 
import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

// Components
import { LaunchTile, Header, Button, Loading } from '../components';

// Query
// fetch list of launches by calling launches query
// launches query returns an object type with a list of launches,
// cursor of the the paginated list,
// and whether or not the list hasMore launches
// needs to be wrapped in gql function in order to parse it into an AST

// spreading in LaunchTile under launches or could just list all the fields from LaunchTile

// BUILDING A FRAGMENT BC SHARING DATA IN LAUNCHES.JS AND LAUNCH.JS
export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
`;



export default function Launches() {
  // using the hooks:
  // pass GET_LAUNCHES query into useQuery hook
  // fetchMore function for pagination
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES); 
  if (loading) return <Loading/>;
  if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header/>
      {data.launches && data.launches.launches && data.launches.launches.map(launch => (
        <LaunchTile
          key={launch.id}
          launch={launch}
        />
      ))}

      {/* LOAD MORE BUTTON */}
      {data.launches && data.launches.launches && (
        <Button 
          onClick={ () => fetchMore({
            variables: {
              after: data.launches.cursor,
            },
            updateQuery: (prev, {fetchMoreResult, ...rest }) => {
              if (!fetchMoreResult) return prev;
              return {
                ...fetchMoreResult,
                launches: {
                  ...fetchMoreResult.launches,
                  launches: [
                    ...prev.launches.launches,
                    ...fetchMoreResult.launches.launches,
                  ],
                },
              };
            },
          })
        }
      >
        Load More
      </Button>
      )}

    </Fragment>
  );
}

