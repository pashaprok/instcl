import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import { appConfig } from '../config/app';


export const apolloClient = new ApolloClient({
  uri: appConfig.backAPILink,
  cache: new InMemoryCache()
});