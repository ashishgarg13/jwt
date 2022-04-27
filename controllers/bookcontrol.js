const Author = require('../models/author');
const Book = require('../models/Book');

module.exports.displayBook = async (req, res) => {
  const author = await Author.findById(req.params.id).populate('books');
  res.render('allbook', { author });
};

module.exports.oneBook = async (req, res) => {
  const product = await Book.findById(req.params.id).populate('author', 'name');
  res.render('book', { product });
};
module.exports.getauthor = async (req, res) => {
  const authors = await Author.find({});
  res.render('author', { authors });
};

module.exports.createbook_get = async (req, res) => {
  console.log('heeeeeeeeeeelo');
  const { id } = req.params;
  const author = await Author.findById(id);
  console.log(id);
  res.render('createbook', { author });
};

module.exports.createauthor_get = (req, res) => {
  res.render('createauthor');
};
module.exports.createauthor_post = async (req, res) => {
  const { name, dob, age } = req.body;

  const author = await Author.create({ name, dob, age });
  console.log(author._id);
  res.redirect('/');
};

module.exports.createbook_post = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const author = await Author.findById(id);
  // console.log(author);

  const { name, published_on, price } = req.body;

  const book = await Book.create({ name, published_on, price });
  author.books.push(book);
  book.author = author;

  res.render('allbook', { author });
};
