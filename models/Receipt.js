const { model, Schema } = require('mongoose');

const receiptSchema = new Schema({
  username: String,
  item: String,
  email: String,
  phone: String,
  dateOpened: String,
  dateClosed: String,
  open: Boolean
}, {
  collection: 'Receipts'
});

module.exports = model('Receipt', receiptSchema);