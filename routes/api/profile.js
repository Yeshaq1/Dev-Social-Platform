const express = require("express");
const router = express.Router()

// @route     GET api/profile
// @desc      TEST route
// @access    Private 

router.get("/", (req,res)=>{
res.send("user profile");
});

module.exports = router;