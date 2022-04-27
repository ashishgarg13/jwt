const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  published_on: String,
  price: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
