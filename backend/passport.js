const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt
const User = require('./module')

const cookieExtractor = req =>{
    let token = null
    if(req && req.cookies){
        tooken = req.cookies("access_token")
    }

    return token
}

let opts = {}


    opts.jwtFormRequest =Extractjwt.cookieExtractor,
    opts.secretOrKey = 'krishna'


passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    User.findById({_id : jwt_payload.sub},(err,user)=>{
        if(err)
            return done(err,false);
        if(user)
            return done(null , user);
        else
            return done(null,false);
    })
}))

passport.use(new LocalStrategy((email,password,done)=>{
    User.findOne({email},(err,user)=>{
        if(err)
            return done(err)
        if(!user)
            return done(null,false)

        user.comparePassword(password,done)
    })
}))


const express =require('express')
const fs =require('fs')
const app=express()
app.use(express.json())
app.post('/user/add',(req,res)=>{
    const exitUser=getUserData()
    const UserData=req.body
   
    
if(UserData.id==null || UserData.fullname==null||UserData.age==null||UserData.username==null||UserData.password==null){
    return res.status(404).send({error:true,msg:'user data missing'})

}
const findexit=exitUser.find(user=>user.username==UserData.username)
//console.log('          findexit    ',findexit)
if(findexit){


    return res.status(409).send({error:true,msg:'user already exit'})

}
exitUser.push(UserData)
saveUserData(exitUser)
res.send({success:true,msg:'user add success'})
})

//get
app.get('/user/list',(req,res)=>{
    const user=getUserData()
    res.send(user)
})

//put
app.put('/user/update/:id',async(req,res)=>{
    const id = req.params.id;
   console.log("gggggggggggggggggggggggggg   ",id)
  
    const exitUser=getUserData()
    
    const findexit=exitUser.findById(req.params.id)
    console.log("gfgfghfgffgdfdfdffgfdfdf   ",findexit)
    if(!findexit){
    return res.status(409).send({error:true,msg:'user not exist'})
    }
const newData = {
  

        fullname: req.body.fullname,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password
}  
const user = await exitUser.findByIdAndUpdate(req.params.id,newData ,{
  new: true,
  runValidators: false,
  userFindAndModify: true
})
updateUser.push(UserData)
saveUserData(updateUser) 
res.send({success:true,msg:'user data update success'})

})

//delete

app.delete('/user/delete/:id',(req,res)=>{
    const id=req.params.id
    const exitUser=getUserData()
    const filterUser=exitUser.filter(user=>user.id!==id)
    console.log(filterUser)
    if(exitUser.length==filterUser.length){
        return res.status(409).send({error:true,msg:'username does not exit'})

    }
   saveUserData(filterUser)
   res.send({success:true,msg:'user remove success'}) 
})



const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('user.json', stringifyData)
}
const getUserData = () => {
    const jsonData = fs.readFileSync('user.json')
    return JSON.parse(jsonData)    
}


app.listen(3000,()=>{
    console.log('this is post method')
})