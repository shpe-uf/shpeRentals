const { model, Schema } = require('mongoose');

const receiptSchema = new Schema({
  username: String,
  item: String,
  dateOpened: String,
  dateClosed: String,
  open: Boolean
}, {
  collection: 'Receipts'
});

module.exports = model('Receipt', receiptSchema);