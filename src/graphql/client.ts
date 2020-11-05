import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import { onError } from 'apollo-link-error';

import { useServerInfo } from '../hooks/serverInfo';

const [httpLinkUri, wsLinkUri] = useServerInfo();

// Create an http link:
const httpLink = new HttpLink({
  uri: `${httpLinkUri}/graphql`,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `${wsLinkUri}/graphql`,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = await AsyncStorage.getItem('token');
      const version = Constants.manifest.version;
      return {
        headers: { 'x-auth': token, version },
      };
    },
  },
});

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  const token = await AsyncStorage.getItem('token');
  const version = Constants.manifest.version;
  return {
    headers: {
      ...headers,
      'x-auth': token,
      version,
    },
  };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },

  wsLink,
  httpLink
);

const cache = new InMemoryCache();

export default new ApolloClient({
  link: authLink.concat(link),
  cache,
  resolvers: {},
});
