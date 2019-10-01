import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import gql from "graphql-tag"; // for vanilla js query

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';

// Creating an Instance of Apollo Client 
const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
  cache,
  link
})


// Querying data using vanilla js
// ... above is the instantiation of the client object.
// client
//   .query({
//     query: gql`
//       query GetLaunch {
//         launch(id: 56) {
//           id
//           mission {
//             name
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
    // pass our const client to the client prop on ApolloProvider
    // so now client can be accessed anywhere in component tree
    <ApolloProvider client={client}> 
      <Pages />
    </ApolloProvider>, document.getElementById('root')
);