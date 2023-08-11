import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag'

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



const contractors = [
    
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

const resolvers = {
  Query: {
    contractors(parent, args, contextValue, info) {
      return contractors;
    },
  },
};


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer);