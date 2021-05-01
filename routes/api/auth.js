const express = require("express");
const router = express.Router()

// @route     GET api/auth
// @desc      TEST route
// @access    Private 

router.get("/", (req,res)=>{
res.send("user Auth");
});

module.exports = router;