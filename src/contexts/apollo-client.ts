import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

const httpUri = 'https://wty-dev-hasura.herokuapp.com/v1/graphql';
const wsUri = httpUri.replace(/^https?/, 'wss');

const httpLink = new HttpLink({
  uri: httpUri,
});

const getAuthorization = () => (
  localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : ''
);

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => ({ authorization: getAuthorization() }),
  },
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: getAuthorization(),
  },
}));

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const link = ApolloLink.from([terminatingLink]);
const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache,
});
