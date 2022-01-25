const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/', (req, res) => {
    Post.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => console.log(err))
});

router.post('/add', (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const post = new Post({
        title,
        body
    });
    post.save()
        .then(post=>{
            res.json(post);
        })
        .catch(err => console.log(err));
});

router.put('/update/:id',(req,res,next)=>{
    const id = req.params.id;
    const post = Post.findById(id)
        .then(post=>{
            post.title = req.body.title;
            post.body = req.body.body;
            post.save()
                .then(post=>{
                    res.send({
                        message:"Post updated successfully",
                        status:"success",
                        post:post
                    })
                })
                .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
});

router.delete('/:id',(req,res,next)=>{
   let id = req.params.id;
   const post = Post.findById(id)
       .then(post=>{
           post.delete()
               .then(()=>{
                   res.send({
                       message:"Post deleted successfully",
                       status:"success"
                   });
               }).catch(err=>console.log(err));
       })
       .catch(err=>console.log(err));
});

module.exports = router