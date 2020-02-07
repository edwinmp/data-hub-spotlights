import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://212.111.41.68:8000/graphql'
});

export const graphClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});
