const express = require("express");
const router = express.Router()

// @route     GET api/posts
// @desc      TEST route
// @access    Private 

router.get("/", (req,res)=>{
res.send("user posts");
});

module.exports = router;