const Errorhandler = require('./errorhandler')
const express = require("express")
const app = express()
const vtoken = require('./mid')
const bodyParser = require("body-parser");
const User = require('./module')
const jwt = require('JsonWebToken');
//const catchCahingError = require("./catchCahingError");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

{/*
module.exports = (req,res,next)=>{
  
  vtoken(req,res,next,()=>{
    try{
      if(req.user.id===req.param.id || req.user.isAdmin){
          next()
      }
    }
      catch(error)
      {
        console.log(error)
        return res.status(403).send('you are not authorize')
      }
         
      })
  
}
*/}


module.exports =(...roles)=>{
    return(req,res,next)=>{
        let token = req.header('x-token');
        let decode = jwt.verify(token,'vamsi')
        req.user = User.findById(decode.id)
        if(!roles.includes(req.user.role)){
            return res.status(400).send(`the role : ${req.user.role} you are can't acess this page`)
            
        }

        next();
    }
}


{/*module.exports = (roles) => {
    return async(req, res, next) => {
        const token = req.header('x-token');
        const decode = jwt.verify(token,'vamsi')
        //console.log(decode.user.id)
        req.user = await User.findById(decode.user.id)
        //console.log(req.user)
        user = req.user.role;
        //console.log(user)

         isAllowed = false;
      
        user.roles.map((role) => {
      if (roles.includes(role)) {
        isAllowed = true;
      }
        });
        
   if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });

    next();
  };
};
*/}