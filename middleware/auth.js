const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) =>{

    const token = req.header('x-auth-token');

    if(!token){

       return res.status(401).send("There is no Token sent");
    }

    try{
        
        const decoded = jwt.verify(token, config.get('privateToken'));
        
        req.user = decoded.user;
        next();
    }
   
    catch(err) {
      res.status(401).json({msg: "Token is not valid"});
    }



}