import { ApolloClient, InMemoryCache } from '@apollo/client';
console.log(process.env.NEXTAPI_URL, "process.env.NEXTAPI_URL");
const client = new ApolloClient({
  uri:  process.env.NEXTAPI_URL || 'https://contractor-demo-nikunjpatel190.vercel.app/api/graphql',// 'http://localhost:3001/api/graphql', // Change this URL to your GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;
