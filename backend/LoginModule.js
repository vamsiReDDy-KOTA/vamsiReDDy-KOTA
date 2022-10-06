const mongoose = require('mongoose')

let Loginuser = new mongoose.Schema({
    imageName:{
        type:String,
        require:true
    },
    image:{
        data:Buffer,
        type: String
    }

})

module.exports = mongoose.model('Registeruser',Loginuser)