const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB (Make sure your MongoDB is running)
mongoose.connect('mongodb://localhost/simple-blog', { useNewUrlParser: true });

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Static files (CSS, JavaScript, etc.)
app.use(express.static('public'));

// Model
const Post = require('./models/post');

// Routes
app.get('/', (req, res) => {
    Post.find({}).exec()
    .then(posts => {
        res.render('index', { posts: posts });
    })
    .catch(err => {
        console.log(err);
    });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const newPost = new Post({
        title: title,
        content: content
    });

    newPost.save()
    .then(post => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
