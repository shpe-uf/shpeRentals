const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Rentable = require('./models/Rentable');
const Receipt = require('./models/Receipt');
const User = require('./models/User');
const { mongodb } = require('./config.js');

const { 
  validateRentalRequest,
  validateReturnRequest
 } = require('./validators');

const typeDefs = gql`
  scalar Date
  type Rentable{
    item: String!
    quantity: Int!
    level: Int!
    description: String
    link: String
    renters: [String]!
  }
  type Receipt{
    username: String!,
    item: String!,
    dateOpened: String!,
    dateClosed: Date,
    open: Boolean!
  }
  type User{
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    points: Int,
    fallPoints: Int,
    springPoints: Int,
    summerPoints: Int,
    permission: String
  }
  input TransactionData {
    item: String!,
    username: String!,
    numberOfItems: Int!
  }
  type Query{
    getInventory: [Rentable]
  }
  type Mutation{
    checkOut(data: TransactionData): [Receipt],
    return(data: TransactionData): [Receipt]
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

    async checkOut(_, data) {
      try{

        //fixes bug where Object Null is received
        const {item, username, numberOfItems} = JSON.parse(JSON.stringify(data)).data;

        const rentable = await Rentable.findOne({'item':item});
        const user = await User.findOne({'username': username});

        let { errors, valid } = validateRentalRequest(
          item,
          username,
          numberOfItems,
          rentable.quantity,
          rentable.renters,
          rentable.level,
          user
        );

        if (!valid) {
          errors = JSON.stringify(errors);
          throw new Error(errors);
        }
        
        for(var i = 1; i <= numberOfItems; i++) {
          if (!rentable.renters || (rentable.renters.length < 1)){
            rentable.renters = [username];
          } else {
            rentable.renters.push(username);
          }
        }

        await rentable.save();

        receipts = [];
        const dateOpened = JSON.stringify(new Date());

        for(var i = 1; i <= numberOfItems; i++) {
          const receipt = new Receipt({
            username,
            item,
            dateOpened,
            open: true
          })
          receipts.push(await receipt.save());
        }

        return receipts;

      } catch(err) {
        throw new Error(err);
      }
    },
    async return(_, data) {
      try{

        const {item, username, numberOfItems} = JSON.parse(JSON.stringify(data)).data;

        const rentable = await Rentable.findOne({'item':item});
        const user = await User.findOne({'username': username});
        const receipts = await Receipt.find({'username': username});
        let { errors, valid } = validateReturnRequest(
          item,
          username,
          numberOfItems,
          rentable.quantity,
          rentable.renters,
          user,
          receipts.filter((e) => {return e.open == true})
        );

        if (!valid) {
          errors = JSON.stringify(errors);
          throw new Error(errors);
        }
        
        const dateClosed = JSON.stringify(new Date());
        for(var i = 0; i < numberOfItems; i++) {
          
          //Delete name entries from renters array
          var pos = rentable.renters.indexOf(username);
          if (pos > -1) {
            rentable.renters.splice(pos,1);
          }

          //Stamp receipts as complete
          var receiptShift = i;
          while(receipts[receiptShift].open == false) {
            receiptShift++; //looking for empty receipts
          }
          receipts[receiptShift].open = false;
          receipts[receiptShift].dateClosed = dateClosed;
          receipts[receiptShift].save();
        }

        rentable.save();

        return receipts;

      } catch(err) {
        throw new Error(err);
      }
    },
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