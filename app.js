const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://Joshua:Ps7d1dlN0502y4sL@cluster0.r96fjuf.mongodb.net/Blog-post?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// blog routes
app.use('/blogs',blogRoutes);

// routes
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});




//404 page
app.use((req, res) => {
res.status(404).render('404',  { title: '404' });
})