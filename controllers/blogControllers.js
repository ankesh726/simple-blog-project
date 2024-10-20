const Blog = require('../models/blogs.js');


const blog_index = (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
      res.render('index',{title: 'All Blogs', blogs: result});
    })
    .then((err)=>{
      console.log(err)
      ;
    });
}

const blog_details = (req,res)=>{
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
      .then((result)=>{
        res.render('details',{title:'Blog Details', blog: result});
      })
      .catch((err)=>{
        res.status(404).render('404', { title: '404' });
      });
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req,res)=>{
    // console.log(req);
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
      res.redirect('/blogs');
    })
    .then((err)=>{
      console.log(err);
    });
}

const blog_delete = (req,res)=>{
    const id = req.params.id;
    // console.log(id);
    Blog.findByIdAndDelete(id)
      .then((result)=>{
        res.json({redirect: '/blogs'});
      })
      .catch((err)=>{
        console.log(err);
      });
}

module.exports = {
    blog_index, 
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};