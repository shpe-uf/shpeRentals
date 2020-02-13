const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Rentable = require('./models/Rentable')
const { mongodb } = require('./config.js');

const typeDefs = gql`
  type Rentable{
    item: String!
    quantity: Int!
    level: Int!
    description: String
    link: String
  }
  type Query{
    getInventory: [Rentable]
  }
  type Mutation{
    checkOut: String
    return: String
  }
`;

const resolvers = {
  Query: {
    async getInventory() {
      try{
        const inventory = await Rentable.find();
        return inventory;
      } catch(err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async checkOut(
      item,
      name
    ) {
      try{
        await Rentable.update({'item':item}, {$push: {renters: name}});
        return 'Success';
      } catch(err) {
        throw new Error(err);
      }
    },
    // async return(
    //   item
    // ) {
    //   try{
    //     const inventory = await Rentable.find();
    //     return inventory;
    //   } catch(err) {
    //     throw new Error(err);
    //   }
    // }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({port: 5000});
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });