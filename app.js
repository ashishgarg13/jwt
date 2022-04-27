const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');
const authRoutes = require('./routes/authroute');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const authController = require('./controllers/auth');
const bookController = require('./controllers/bookcontrol');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// view engine
app.set('view engine', 'ejs');
mongoose
  .connect(
    'mongodb+srv://ashish1:ashish@cluster0.dygs8.mongodb.net/myFirstDatabase42?retryWrites=true&w=majority'
  )
  .then((data) => console.log('Connected'));

// middleware
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'ashish', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/signup');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/signup');
  }
};

app.get('/author/:id/createbook', requireAuth, bookController.createbook_get);
app.post('/author/:id/createbook', requireAuth, bookController.createbook_post);
app.get('/createauthor', requireAuth, bookController.createauthor_get);
app.post('/createauthor', requireAuth, bookController.createauthor_post);

app.use(authRoutes);
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Book.findByIdAndDelete(id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('server started ................');
});
