const express = require("express");
const router = express.Router()

// @route     POST api/users
// @desc      TEST route
// @access    Private 

router.post("/", (req,res)=>{
console.log(req.body);
res.send("user route");
});

module.exports = router;