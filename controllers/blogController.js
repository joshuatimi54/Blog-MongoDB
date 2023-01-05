const Blog = require('../models/blog');


// blog_index
const blog_index = (_req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    })
}

// blog_details
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    });
}

// blog_create_get
const blog_create_get = (_req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' });
}

// blog_create_post
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((_result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
}

// blog_create_delete
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(_result => {
        res.json({ redirect: '/blogs' });
    })
    .catch(err => {
        console.log(err);
    })
}

// module export to blogRoutes
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}