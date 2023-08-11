import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:  process.env.NEXTAPI_URL || 'https://contractor-demo-nikunjpatel190.vercel.app/api/graphql',
  // uri: 'http://localhost:3001/api/graphql',
  cache: new InMemoryCache(),
});

export default client;
