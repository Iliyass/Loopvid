import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});
const INITIAL_STATE = {
  stateUI: {
    __typename: 'stateUI',
    searchMode: false,
    searchTerm: null,
    filtersResolution: null,
    filtersSort: null,
    filtersDuration: null,
    searchFiltersOpen: false,
    searchSuggestions: []
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
              filtersResolution
              filtersSort
              filtersDuration
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
    new HttpLink({ uri: `http://${process.env.REACT_APP_HOST}/graphql` })
  ])
});

export default client