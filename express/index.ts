import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();

// Define your GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Create a resolver for the 'hello' query
const root = {
  hello: () => 'Hello, GraphQL!'
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable the GraphiQL UI for testing
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}/graphql`);
});
