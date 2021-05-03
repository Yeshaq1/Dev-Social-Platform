const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/Users")

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

module.exports = router;