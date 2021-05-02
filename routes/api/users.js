const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");

// @route     POST api/users
// @desc      TEST route
// @access    Private 

router.post("/", 

[body('name','name is required').not().isEmpty(),
 body('email',"please include a valid email").isEmail(),
 body('password','please enter a password with 6 or more characters').isLength({min:6})
] 

,(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}

console.log(req.body);
res.send("user route");
});

module.exports = router;