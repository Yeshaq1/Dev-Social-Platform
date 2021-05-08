const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/Users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {body, validationResult} = require("express-validator");

// @route     GET api/auth
// @desc      TEST route
// @access    Private 

router.get("/", auth, async (req,res)=>{

    try{

        const user =  await User.findById(req.user.id).select("-password");
        res.json(user);
    }
   
    catch(err){
        console.error(err.message);
        return res.status(400).json({msg:"Server Error"});
    }
    
});

//----------------------------------POST----------------------------------

router.post("/", 

// using express validator to check the req.body parameters in JSON

[
 body('email',"please include a valid email").isEmail(),
 body('password','password is required').exists(),
],

async (req,res)=>{

//checking if there are any validation issues

const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});
}

const {email, password} = req.body;

try {

 let user = await User.findOne({email:email});

 if (!user){
   return res.status(400).json({errors:[{message:"Authentication Failed"}]});
 }

 // authenticate user
 const comparePassword =  await bcrypt.compare(password,user.password);


 if (!comparePassword){
    return res.status(400).json({errors:[{message:"Authentication Failed"}]});
 }

// Return jsonwebtoken - set up the payload - for this purposes, only the User ID is requred.
const payload = {
    user:{
        id: user.id
    }
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