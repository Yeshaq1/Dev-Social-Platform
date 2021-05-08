const express = require("express");
const router = express.Router();
const {
    body,
    validationResult
} = require("express-validator");
const User = require("../../models/Users");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");





// @route     POST api/posts
// @desc      Create a post
// @access    Private 

router.post("/", [auth,
        [body('text', 'post text is required').not().isEmpty()]
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        };


        try {

            const user = await User.findOne({
                _id: req.user.id
            }).select('-password');

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

router.get("/", auth, async (req, res) => {

    try {

        const posts = await Post.find().sort({
            date: -1
        });

        if (!posts.length) {

            return res.status(400).json({
                msg: "There are no posts"
            });
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

router.delete("/:post_id", auth, async (req, res) => {

    try {

        post = await Post.findById(req.params.post_id);

        if (!post) {

            return res.status(404).json({
                msg: "No Post Found"
            });
        }


        if (post.user.toString() !== req.user.id) {

            return res.status(401).json({
                msg: "No access allowed"
            });
        }



        await Post.deleteOne({
            _id: req.params.post_id
        });

        res.json({
            msg: "Post Deleted"
        });

    } catch (err) {

        if (err.kind === 'ObjectId') {

            return res.status(404).json({
                msg: "No Post Found"
            });
        }

        console.error(err.message);
        return res.status(500).send("Server Error");

    }


});


// @route     GET api/posts/:post_id
// @desc      GET a post 
// @access    Private 

router.get("/:post_id", auth, async (req, res) => {

    try {

        post = await Post.findById(req.params.post_id).populate('likes.user', ['name', 'avatar']);

        if (!post) {

            return res.status(404).json({
                msg: "No Post Found"
            });
        }

        res.json(post);

    } catch (err) {

        if (err.kind === 'ObjectId') {

            return res.status(404).json({
                msg: "No Post Found"
            });
        }

        console.error(err.message);
        return res.status(500).send("Server Error");

    }


});

// @route     PUT api/posts/like/:post_id
// @desc      PUT a Like  
// @access    Private 

router.put("/like/:post_id", auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.post_id);


        //Checking if the ppost has already been liked 
        let alreadyLiked = false;
        post.likes.map((like) => {
            if (like.user.toString() === req.user.id) {
                alreadyLiked = true;
            }
        })

        if (alreadyLiked) {
            return res.status(400).json({
                msg: "Already liked"
            })
        }

        post.likes.unshift({
            user: req.user.id
        });
        post.save();
        res.json(post.likes);

    } catch (err) {

        if (err.kind === 'ObjectId') {

            return res.status(404).json({
                msg: "No Post Found"
            });
        }

        console.error(err.message);
        return res.status(500).send("Server Error");

    }

});

// @route     PUT api/posts/unlike/:post_id
// @desc      unlike a post  
// @access    Private 

router.put("/unlike/:post_id", auth, async (req, res) => {

    try {

        let post = await Post.findById(req.params.post_id);


        //Checking if the post has already been liked 
        let alreadyLiked = false;
        post.likes.map((like) => {
            if (like.user.toString() === req.user.id) {
                alreadyLiked = true;
            }
        })

        if (alreadyLiked) {

            post = await Post.findOneAndUpdate({
                _id: req.params.post_id
            }, {
                $pull: {
                    likes: {
                        user: req.user.id
                    }
                }
            }, {
                new: true
            });

            return res.json(post.likes);

        }

        res.status(400).json({
            msg: "This post was not liked"
        });

    } catch (err) {

        if (err.kind === 'ObjectId') {

            return res.status(404).json({
                msg: "No Post Found"
            });
        }

        console.error(err.message);
        return res.status(500).send("Server Error");

    }

});

// @route     POST api/posts/comment/:post_id
// @desc      Create a post
// @access    Private 

router.post("/comment/:post_id", [auth,
        [body('text', 'post text is required').not().isEmpty()]
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        };


        try {

            const user = await User.findOne({
                _id: req.user.id
            }).select('-password');

            const post = await Post.findById(req.params.post_id);


            const newComment = {

                text: req.body.text,
                user: req.user.id,
                avatar: user.avatar,
                name: user.name
            }

            post.comments.unshift(newComment);
            await post.save();

            res.json(post.comments);

        } catch (err) {

            if (err.kind === 'ObjectId') {

                return res.status(404).json({
                    msg: "No Post Found"
                });
            }
            console.error(err.message);
            return res.status(500).send("server Error");
        }

    });


// @route     POST api/posts/comment/:post_id/:comment_id
// @desc      Create a post
// @access    Private 

router.delete("/comment/:post_id/:comment_id", auth,


    async (req, res) => {


        try {

            let post = await Post.findById(req.params.post_id);

            const comment = post.comments.find(comment => comment.id === req.params.comment_id);

            //Make sure the comment exsits
            if (!comment) {

                return res.status(404).json({
                    msg: "no comment found"
                });
            }

            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({
                    msg: "User not authorzied"
                });
            }

            post = await Post.findOneAndUpdate({
                'comments._id': req.params.comment_id
            }, {
                $pull: {
                    comments: {
                        _id: req.params.comment_id
                    }
                }
            }, {
                new: true
            });

            res.json(post.comments);


        } catch (err) {

            if (err.kind === 'ObjectId') {

                return res.status(404).json({
                    msg: "No comment found"
                });
            }
            console.error(err.message);
            return res.status(500).send("server Error");
        }

    });



module.exports = router;