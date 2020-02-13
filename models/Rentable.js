const { model, Schema } = require('mongoose');

const rentableSchema = new Schema({
  item: String,
  quantity: Number,
  level: Number,
  description: String,
  link: String,
  renters: [String]
}, {
  collection: 'Inventory'
});

module.exports = model('Rentable', rentableSchema);