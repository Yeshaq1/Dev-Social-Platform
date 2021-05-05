const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const {body, validationResult} = require("express-validator");
const { route } = require("./auth");


// @route     GET api/profile/me
// @desc      Get current users profile route
// @access    Private 

router.get("/me", auth, async (req,res)=>{

try {

    const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);

    if (!profile){

        return res.status(400).json({msg:"There is no profile for this user"});
    }

    res.json(profile);

}

catch(err){

    console.error(err.message);
    res.status(500).send("Sever Error");
}

});

// @route     POST api/profile
// @desc      POST current users profile route
// @access    Private 


router.post("/",[auth,[

 body('skills','name is required').not().isEmpty(),
 body('status',"status is required").not().isEmpty()

]],  

async(req,res)=>{

const errors = validationResult(req);

if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});
}

const {
company, 
status,
website,
skills,
location,
bio,
githubusername,
twitter,
facebook,
youtube,
linkedin,
instagram
} = req.body

const createdProfile = {};
createdProfile.user = req.user.id;
if (company) createdProfile.company = company;
if (status) createdProfile.status = status;
if (website) createdProfile.wesbite = website;
if (location) createdProfile.location = location;
if (bio) createdProfile.bio = bio;
if (githubusername) createdProfile.githubusername = githubusername;

createdProfile.social = {};

if (facebook) createdProfile.social.facebook = facebook;
if (youtube)  createdProfile.social.youtube = youtube;
if (linkedin) createdProfile.social.linkedin = linkedin;
if (twitter) createdProfile.social.twitter = twitter;
if (instagram) createdProfile.social.instagram = instagram;

if (skills) {

    createdProfile.skills = skills.split(",").map(skill=> skill.trim());
}

try{

    let profile = await Profile.findOne({user: req.user.id});

    if(profile){

        profile = await Profile.findOneAndUpdate({user: req.user.id},{$set :createdProfile},{new :true});
        return res.json(profile);
    }
   
    profile = new Profile(createdProfile);

     await profile.save();
     res.json(profile);
   
}

catch(err){

    console.error(err.message);

    res.status(500).send("Server Error");
}

});


// @route     GET api/profile
// @desc      GET All profiles
// @access    Public 


router.get("/", async (req, res)=>{

    try {
        
        let profiles = await Profile.find().populate("user",['name', 'avatar']);
        res.json(profiles);

    } catch (err) {

        console.error(err.message);
        return res.status(500).send("Server Error");
        
    }

});


// @route     GET api/profile/:user_ID
// @desc      GET specific profile using user ID
// @access    Public 


router.get("/user/:user_id", async (req, res)=>{

    try {
        
        let profile = await Profile.findOne({user:req.params.user_id}).populate("user",['name', 'avatar']);

        if(!profile){

            return res.status(400).json({msg: "profile not found"});
        }

        res.json(profile);

    } catch (err) {

        console.error(err.message);

        if(err.kind == "ObjectId"){

            return res.status(400).json({msg: "profile not found"});
        }
        return res.status(500).send("Server Error")
        
    }

});

// @route     DELETE api/profile/me
// @desc      DELETE specific profile
// @access    Private 

router.delete("/", auth, async (req,res)=>{


    profile = await Profile.findOne({user: req.user.id});

    if (!profile){

        return res.status(500).json({msg: "Profile not found"});
    }

try {
   
 await Profile.deleteOne({user: req.user.id});
 await User.deleteOne({_id: req.user.id});
 
 res.send("Profile Deleted");

} catch (err) {
     console.error(err.message);
     return res.status(500).send("Server Error")
}
    
});

module.exports = router;