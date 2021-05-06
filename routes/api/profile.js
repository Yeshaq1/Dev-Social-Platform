const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const {body, validationResult} = require("express-validator");
const { route } = require("./auth");
const https = require('https');


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

// @route     DELETE api/profile/
// @desc      DELETE specific profile and User
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
    


// @route     PUT api/profile/experience
// @desc      PUT a specific experience 
// @access    Private 

router.put("/experience", [auth, [ 

body('title','title is required').not().isEmpty(),
body('company',"company name is required").not().isEmpty(),
body('from','from is required')]],

async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
    }

    const {
        title, 
        from,
        current,
        to,
        company,
        location,
        description
    } = req.body;

    const newExp = {
        title,
        from,
        current,
        to,
        company,
        location,
        description
    };

    try {
        
        const profile = await Profile.findOne({user:req.user.id});
        
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
 

});


// @route     Delete api/profile/experience/experience_id
// @desc      Delete a specific experience 
// @access    Private 

router.delete("/experience/:experience_id", auth, async (req,res)=>{

  try {
    
    profile = await Profile.findOneAndUpdate({user:req.user.id},
        {$pull:{experience:{_id: req.params.experience_id}}},
        {new :true});

    res.json(profile);
      
  } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
  }

});

// @route     PUT api/profile/education 
// @desc      PUT a specific education 
// @access    Private 

router.put("/education", [auth, [ 

    body('school','school is required').not().isEmpty(),
    body('degree',"degree name is required").not().isEmpty(),
    body('from','from is required'),
    body('fieldofstudy','field of study is required')]],
    
    async (req,res)=>{
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        }
    
        const {
            school, 
            from,
            degree,
            to,
            fieldofstudy,
            description,
            current
        } = req.body;
    
        const newEdu = {
            school, 
            from,
            degree,
            to,
            fieldofstudy,
            description,
            current
        };
    
        try {
            
            const profile = await Profile.findOne({user:req.user.id});
            
            profile.education.unshift(newEdu);
            await profile.save();
            res.json(profile);
    
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server Error");
        }
     
    
    });
    
    
    // @route     Delete api/profile/experience/educaiton_id
    // @desc      Delete a specific education
    // @access    Private 
    
    router.delete("/education/:education_id", auth, async (req,res)=>{
    
      try {
        
        profile = await Profile.findOneAndUpdate({user:req.user.id},
            {$pull:{education:{_id: req.params.education_id}}},
            {new :true});
    
        res.json(profile);
          
      } catch (err) {
          console.error(err.message);
          return res.status(500).send("Server Error");
      }
    
    });

    // @route     GET api/profile/github/:username
    // @desc      GET a Github repos
    // @access    Public
    
    router.get("/github/:username", async (req,res)=>{

    
         const options = {

            accept: "application/vnd.github.v3+json",
            headers: {'user-agent': 'node.js'},
            host: 'api.github.com',
            path: `/users/${req.params.username}/repos?type=owner&sort=updated&per_page=5`,
            method : 'GET'
            
           }
    try {
           // API CALL HERE -------------------------------------------
         const request =  https.request(options,(response)=>{
           // SINCE data is recieved as chunks, set up an array to include all the data and only parse the data at the end.
            const reposChunks = [];
            if (response.statusCode !== 200){
                return res.json({msg: "profile not found"});
            }
            //collecting data into array
            response.on("data", function(d){
             reposChunks.push(d);
               
            });
            // on end parsing the data
            response.on('end',function(){
                const buffer = Buffer.concat(reposChunks);
                let finalRepos = JSON.parse(buffer);
                res.json(finalRepos);
            })
              
            });

            request.end();

            
        } catch (err) {
          console.error(err.message);
          return res.status(500).send("Server Error");
            
        }


    });

module.exports = router;