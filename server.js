const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.error('MongoDB connection error:', err));

// How we convert to HTML
// app.set('view engine', 'ejs')

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('public'));

// The Route
// app.get('/', (req, res) => {
//     const articles = [{
//         title: 'Test Article',
//         createdAt: new Date(),
//         description: 'Test description'
//     },
//     {
//         title: 'Test Article 2',
//         createdAt: new Date(),
//         description: 'Test description 2'
//     }]
//     res.render('index', { articles: articles })
// })

// Routes
app.get('/', async (req, res) => {
    try {
      const articles = await Article.find().sort({ createdAt: 'desc' });
      res.render('articles/index', { articles: articles });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});

// Route Test - with text
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.use('/articles', articleRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});