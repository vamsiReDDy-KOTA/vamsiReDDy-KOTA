const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    image:{
        krishna:String,
        contentType: String,
        //default:"none"
    },
    isAdmin: {
          type:Boolean,
          default: true,
    },
    resetPasswordToken: {
            type: String,
            required: false
    },
    
    resetPasswordExpires: {
            type: Date,
            required: false
    },
    
    
})

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

{/*UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passworsHash)=>{
        if(err)
            return next(err);
        this.password = passworsHash;
        next()
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
        return cb(err)
        else{
            if(!isMatch)
                return cb(null,isMatch)
            return cb(null,this)
        }
    })
}
*/}

module.exports = mongoose.model('User',UserSchema)