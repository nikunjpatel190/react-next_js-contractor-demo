import { ApolloServer, gql } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse, IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
// import { buildSchema } from 'type-graphql';

const intData = {
  contractors: [
    
      {
        id:1,
        name: 'Strykes',
        specialities: ['Surgery', 'Medical'],
        availability: 'Yes',
        day_rate: "$ 300,00",
        color:'#3F893E'
      },
      {
        id:2,
        name: 'Rossonerri',
        specialities: ['Healthcare', 'Fitness'],
        availability: 'No',
        day_rate: "$ 250,00",
        color:'#3E4589'
      },
      {
        id:3,
        name: 'Tyga',
        specialities: ['Surgery', 'Medical'],
        availability: 'Yes',
        day_rate: "$ 199,00",
        color:'#883E89'
      },
      {
        id:4,
        name: 'Yolo.corp',
        specialities: ['Automotive', 'Modification'],
        availability: 'Yes',
        day_rate: "$ 200,00",
        color:'#89863E'
      },
      {
        id:5,
        name: 'Bardi',
        specialities: ['Technology', 'Home Living'],
        availability: 'No',
        day_rate: "$ 100,00",
        color:'#893E3E'
      },
    
  ]
}

const typeDefs = gql`
  type Contractor {
    id: ID!
    name: String!
    specialities: [String!]
    availability: String!
    day_rate: String!
    color: String!
  }

  type Query {
    contractors: [Contractor]
  }
`;

const resolvers = {
  Query: {
    contractors: (obj: any, args: any, context: { contractors: any; }) => intData.contractors,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = server.start();

export default async function handler(req: MicroRequest, res: ServerResponse<IncomingMessage>) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}