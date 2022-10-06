const jwt = require('JsonWebToken');
const User = require('./module')

module.exports = async function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    let token = req.header('x-token');
        let decode = jwt.verify(token,'vamsi')
       // console.log(decode)
        req.user =await User.findById(decode.user.id)
    
    //console.log(req.user)
    if (!req.user.isAdmin) return res.status(403).send('Access denied Admin');
  
    next();
  }
    