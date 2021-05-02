const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const User = require("../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route     POST api/users
// @desc      TEST route
// @access    Private 

router.post("/", 

// using express validator to check the req.body parameters in JSON
[body('name','name is required').not().isEmpty(),
 body('email',"please include a valid email").isEmail(),
 body('password','please enter a password with 6 or more characters').isLength({min:6})
],

async (req,res)=>{
//checking if there are any validation issues
const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});
}

const {name, email, password} = req.body;

try {
//checking if the user is already Registered 
 let user = await User.findOne({email:email});

 if (user){

   return res.status(400).json({errors:[{message:"This user is already registered"}]});
 }
// setting an avatar using Gravatar 
let avatar = gravatar.url(email, {
    s:"200",
    r:"x",
    d:"retro"
})

// setting up the user object 
 user = new User({
    name :name,
    password: password,
    email: email,
    avatar: avatar
 });
 
// encrypting the password
 const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(password, salt);

// saving the user

await user.save();

// Return jsonwebtoken - set up the payload - for this purposes, only the User ID is requred.
const payload = {
    userid: user.id
};


//Setup and return the Payload.
jwt.sign(payload,
    config.get("privateToken"),
    { expiresIn: 360000 },
    (err,token) => {
        if (err)
            throw err;
            res.json({token});
    });


}

// records any server failure. 
catch(err) {
    console.error(err.message);
    return res.status(500).send("server error");
}

});

module.exports = router;