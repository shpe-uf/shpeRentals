const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const {userDB} = require('../config');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  points: Number,
  fallPoints: Number,
  springPoints: Number,
  summerPoints: Number,
  permission: String
}, {
  collection: 'users'
});

const switchDB = mongoose.createConnection(userDB,{ useNewUrlParser: true, useUnifiedTopology: true });

module.exports = switchDB.model('User', userSchema);