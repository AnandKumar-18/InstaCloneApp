const express = require('express');
const bodyParser = require('body-parser')
const Post = require('../model/post');
const router = express.Router()

router.use(bodyParser());
// ============================ FETCH POSTS =====================================
router.get("/posts", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    const posts = await Post.find();
    res.status(200).json({
        status: "success",
        posts
    })
})

// ============================ CREATE POSTS =====================================
router.post("/posts", async (req, res) => {
    try {
        const post = await Post.create({
            name: req.body.name,
            location: req.body.location,
            image: req.body.image,
            likes: req.body.likes,
            description: req.body.description,
            PostImage: req.body.PostImage,
            date: req.body.date
        })
        return res.status(200).json({
            status: "Post created",
            data: post
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

// ============================ EDIT POSTS =====================================
router.put("/posts/:id", async(req,res) => {
    try{
       const post = await Post.updateOne({_id:req.params.id}, req.body);
       if (post.modifiedCount>0){
            return res.status(200).json({
                status:"Success",
                message:"Post Updated"
            })
       }else{
           return res.status(401).json({
               status:"Failed",
               message:"Not authorized to edit this post"
           })
       }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
});
// ============================ DELETE POSTS =====================================
router.delete("/posts/:id", async(req,res) => {
    try{
        const post = await Post.deleteOne({_id:req.params.id});
        if (post.deletedCount>0){
            return res.status(200).json({
                status:"Success",
                message:"Post Deleted"
            })
        }else{
           return res.status(401).json({
               status:"Failed",
               message:"Not authorized to delete this post"
           })
       }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
});

module.exports = router