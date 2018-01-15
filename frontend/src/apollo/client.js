import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

const cache = new InMemoryCache();

const INITIAL_STATE = {
  stateUI: {
    __typename: 'stateUI',
    searchMode: false,
    searchTerm: null,
    searchResolution: null,
    searchSort: null,
    searchDuration: null,
    searchFiltersOpen: false
  }
}

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateUI: (_, { key, value }, { cache }) => {
        const query = gql`
          query getUI {
            stateUI @client {
              searchMode
              searchTerm
              searchResolution
              searchSort
              searchDuration
              searchFiltersOpen
            }
          }
        `;
        const previousState = cache.readQuery({ query });

        const data = {
          ...previousState,
          stateUI: {
            ...previousState.stateUI,
            [key]: value
          }
        }
        cache.writeQuery({ query, data });
        return data
      }
    },
  },
  defaults: INITIAL_STATE
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'http://localhost:3001/graphql' })
  ])
});

export default client