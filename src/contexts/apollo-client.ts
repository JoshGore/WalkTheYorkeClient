import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

const httpUri = process.env.REACT_APP_API_URL!;
// const httpUri = 'https://api.wty.joshgore.com.au/v1/graphql';
const wsUri = httpUri.replace(/^https?/, 'wss');

const httpLink = new HttpLink({
  uri: httpUri,
});

const getAuthorization = () =>
  localStorage.getItem('authToken')
    ? `Bearer ${localStorage.getItem('authToken')}`
    : '';

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => ({
      headers: { Authorization: getAuthorization() },
    }),
  },
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: getAuthorization(),
  },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.log(graphQLErrors);
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      message === 'Authentication hook unauthorized this request' &&
        localStorage.removeItem('authToken');
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query,
    ) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const link = ApolloLink.from([errorLink, terminatingLink]);
const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
