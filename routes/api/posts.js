const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const User = require("../../models/Users");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const { ConnectionStates } = require("mongoose");




// @route     POST api/posts
// @desc      Create a post
// @access    Private 

router.post("/", [auth, 
[body('text','post text is required').not().isEmpty()]],

async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };
   

    try {

        const user = await User.findOne({_id: req.user.id}).select('-password');

        const newPost = {
    
            text: req.body.text,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
        }
    
       const post = new Post(newPost);
       await post.save();
    
       res.json(post);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send("server Error");
    }
   
});

// @route     GET api/posts
// @desc      GET all posts
// @access    Private 

router.get("/", auth, async (req,res)=>{

    try {

        const posts = await Post.find().sort({date: -1});

        if(!posts.length){

            return res.status(400).json({msg: "There are no posts"});
        }


        res.json(posts);
        
    } catch (err) {

        console.error(err.message);
        return res.status(500).send("Server Error");

    }


});

// @route     DELETE api/posts/:post_id
// @desc      DELETE a post 
// @access    Private 

router.delete("/:post_id", auth, async (req,res)=>{

  try {

    post = await Post.findById(req.params.post_id);

    if(post.user.toString() !== req.user.id){

        return res.status(401).json({msg:"No access allowed"});
    }

    if (!post){

        return res.status(404).json({msg: "No Post Found"});
    }

    await Post.deleteOne({_id: req.params.post_id});

    res.json({msg: "Post Deleted"});
      
  } catch (err) {

    if (err.kind === 'ObjectId'){
  
        return res.status(404).json({msg: "No Post Found"});
    }

      console.error(err.message);
      return res.status(500).send("Server Error");
      
  }


});


// @route     GET api/posts/:post_id
// @desc      GET a post 
// @access    Private 

router.get("/:post_id", auth, async (req,res)=>{

    try {
  
      post = await Post.findById(req.params.post_id);
  
      if (!post){
  
        return res.status(404).json({msg: "No Post Found"});
      }
  
      res.json(post);
        
    } catch (err) {

        if (err.kind === 'ObjectId'){
  
            return res.status(404).json({msg: "No Post Found"});
        }
  
        console.error(err.message);
        return res.status(500).send("Server Error");
        
    }
  
  
  });

module.exports = router;