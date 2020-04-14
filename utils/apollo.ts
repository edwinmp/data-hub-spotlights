import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'node-fetch';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://212.111.41.68:8000/graphql',
  fetch: fetch as any // window.fetch and node-fetch have conflicting typings
});

export const graphClient = new ApolloClient({
  cache,
  link
});
