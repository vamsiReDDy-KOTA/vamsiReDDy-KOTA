const express = require("express");
const mongoos = require("mongoose");
const vamsi = require("./module");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const vtoken = require("./mid");
const bcrypt = require("bcrypt");
//const AuthorizeRoles = require('./auth')
//const forgetPassword = require('./forgetResetPassword/forgetPassword')
//const userRouts = require('./Routes/User')
const cookieParser = require("cookie-parser");
const isAdmin = require("./isAdmin");
//const { Passport } = require('passport/lib')
//const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const User = require("./LoginModule");
const fs = require("fs");
const { async } = require("rxjs");
const uploads = multer({ dest: "uploads/" });

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({  extended: false }));

//app.use(Passport.initialize())

mongoos
  .connect(
    `mongodb+srv://krishna:vamsi22
@ecom.xhuom.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("database is conneted"));

//mongoos.connect(`mongodb://localhost:27017/log`).then(console.log('mongo is connected'))

app.use(cors({ origin: "*" }));

const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    //const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, file.originalname);
  },
});
var uploaed = multer({
  storages: storages,
  limits: {
    fileSize: 1024 * 1024 * 15 * 2,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("image");

app.post("/register", uploaed, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { fullname, username, email, password, confirmPassword, isAdmin } =
      req.body;
    //const {image} =  req.file.filename
    const hass = bcrypt.hashSync(password, salt);
    const conHass = bcrypt.hashSync(confirmPassword, salt);
    let exist = await vamsi.findOne({ email });

    if (exist) {
      return res.status(400).send("email is their");
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send(" password and confirmpassword should be same");
    }
    let newUser = new vamsi({
      fullname,
      username,
      email,
      password: hass,
      confirmPassword: conHass,
      //image,
      isAdmin,
    });

    await newUser.save();
    return res.status(200).send("user regested done");
  } catch (error) {
    console.log(error);
    return res.send(500).send("Internal server");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let exist = await vamsi.findOne({ email });

    if (!exist) {
      return res.status(400).send("user is not present in our Database");
    }

    const isPasswordCorrect = await bcrypt.compare(password, exist.password);

    //console.log(exist)

    if (!isPasswordCorrect) {
      return res.status(400).send("password went wrong");
    }

    let payload = {
      user: {
        id: exist.id,
      },
    };

    jwt.sign(
      payload,
      "vamsi",
      { expiresIn: 60 * 60 * 1000 },
      async (err, token) => {
        if (err) {
          console.log(err);
        }
        return await res.json({
          token: token,
          id: exist._id,
          email: exist.email,
          isAdmin: exist.isAdmin,
        });
      }
    );
    //return res.json(exist)
  } catch (error) {
    console.log(error);
    return res.send(500).send("Internal server");
  }
});

app.post("/add", vtoken, (req, res) => {
  res.send("it is working");
});

// allProfiles

const search = () =>{

}

app.get("/allprofiles", vtoken, isAdmin, async (req, res) => {
  try {
  let query;


  const searchFild = req.query.username

  const search = await vamsi.find({
    $or:[
    {username:{$regex:searchFild,$options:'$i'}}
    ]
  })


  let uiValues = {
    filtering: {},
    sorting: {},
  };

  const reqQuery = { ...req.query };

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = vamsi.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(",");

    sortByArr.forEach((val) => {
      let order;

      if (val[0] === "-") {
        order = "descending";
      } else {
        order = "ascending";
      }

      uiValues.sorting[val.replace("-", "")] = order;
    });

    const sortByStr = sortByArr.join(" ");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("-fullname");
  }

  const bootcamps = await query;

  const maxPrice = await vamsi.find()
    .sort({ fullname: -1 })
    .limit(1)
    .select("-_id fullname");

  const minPrice = await vamsi.find()
    .sort({ fullname: 1 })
    .limit(1)
    .select("-_id fullname");

  uiValues.maxPrice = maxPrice[0].price;
  uiValues.minPrice = minPrice[0].price;

    //let allprofiles = await vamsi.find();
    return res.status(200).json({
      success: true,
      data: bootcamps,
      sea:search,
      uiValues,
    });
    //return res.json(bootcamps);
  } catch (error) {
    console.log(error);
    res.status(400).send("server Error");
  }
});

app.post("/admin/createAcounts", vtoken, isAdmin, uploaed, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { fullname, username, email, password, confirmPassword, isAdmin } =
      req.body;
    const hass = bcrypt.hashSync(password, salt);
    const conHass = bcrypt.hashSync(confirmPassword, salt);
    let exist = await vamsi.findOne({ email });

    if (exist) {
      return res.status(400).send("email is their");
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send(" password and confirmpassword should be same");
    }
    let newUser = new vamsi({
      fullname,
      username,
      email,
      password: hass,
      confirmPassword: conHass,
      isAdmin,
    });

    await newUser.save();
    return res.status(200).send("user regested done");
  } catch (error) {
    console.log(error);
    return res.send(500).send("Internal server");
  }
});

app.get("/myProfile", vtoken, async (req, res) => {
  try {
    let token = req.header("x-token");
    let decode = jwt.verify(token, "vamsi");
    let user = await vamsi.findById(decode.user.id);
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server");
  }
});

app.delete(
  "/admin/deleteProfile/:id",
  vtoken,
  isAdmin,
  async (req, res, next) => {
    try {
      const user = await vamsi.findById(req.params.id);
      if (!user) {
        //return next(new Errorhandler(`user does not exist with id:${req.params.id}`))
        return res
          .status(400)
          .send(`user does not exist with id:${req.params.id}`);
      }

      await user.remove();
      next();
      res.status(200).send("user Delete Successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server");
    }
  }
);

app.put("/admin/updateUser/:id", vtoken, isAdmin, async (req, res, next) => {
  try {
    let userd = vamsi.findById(req.params.id);
    if (!userd) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }
    const newUserData = {
      fullname: req.body.fullname || vamsi.fullname,
      username: req.body.username || vamsi.username,
      isAdmin: req.body.isAdmin || vamsi.isAdmin,
    };

    const user = await vamsi.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: false,
      userFindAndModify: true,
    });
    return res.status(200).send("user updated Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server");
  }
});

app.post("/uploadProfile", (req, res) => {});

app.post("/password/forget", async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);
  vamsi.findOne({ email: req.body.email }).then((user) => {
    if (user === null) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      user.update({
        resetPasswordToken: token,
        resetpasswordExpire: Date.now() + 3600000,
      });
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "eugene.homenick@ethereal.email",
          pass: "96SgSkK9WDnzmsnXSd",
        },
      });
      const mailOptions = {
        from: "vamsi.1255237@gmail.com",
        to: `${user.email}`,
        subject: "link To reset password",
        text:
          `you are receiving this because \n\n` +
          `http:localhost:4001/reset/${token}\n\n` +
          `if you not click it will remain same`,
      };

      console.log("mail is sending");

      transporter.sendMail(mailOptions, function (err, resp) {
        if (err) {
          console.log("there was an error", err);
        } else {
          console.log("here is the responce", resp);
          res.status(200).json("recovery mail is sent");
        }
      });
    }
  });
});

//router.post('/recover', [
//    check('email').isEmail().withMessage('Enter a valid email address'),
//], validate, Password.recover);

//--------------- upload images -------------------

//const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15 * 2,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("image");

app.put("/addImage/:id", vtoken, upload, async (req, res, next) => {
  console.log(req.file.filename);
  //   res.send({ data: JSON.stringify(req) });
  //return
  try {
    let userd = vamsi.findById(req.params.id);
    if (!userd) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }
    //console.log(req.params.id)

    const newProfileData = {
      image: { krishna: req.file.filename, contentType: "image/png" },
    };
    const user = await vamsi.findByIdAndUpdate(req.params.id, newProfileData, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    //await user.save();
    const saveImage = await user.save();
    res.status(200).send({
      message: "ok",
      payload: saveImage,
    });
  } catch (error) {
    res.status(400);
    next({
      statusCode: 400,
      message: "error",
      error: error.message,
    });
  }

  {
    /*const url = req.protocol + '://' + req.get('host')
    const img = fs.readFileSync(req.file.path)
    const encode_img = img.toString('base64')
   
    const user = {
        contentType : req.file.mimetype,
    
        image:  new Buffer(encode_img,'base64')
    };
    User.create(user,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result.img.Buffer);
            console.log('saved to dataBase')
            res.contentType(user.contentType)
            res.send(user.image)
        }
    })

*/
  }
  //console.log(req)
  {
    /* user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
*/
  }
});

app.get("/getImage/:id", async (req, res) => {
  try {
    const result = await vamsi.findById(req.params.id);
    res.set("Content-Type", "image/jpeg", "image/png", "image/jpg");
    // const imageBase64= result.image.krishna.toString("base64");
    //result.image.krishna  = imageBase64
    res.send(result.image);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

app.post("/forgetpass", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await vamsi.findOne({ email });
    if (!oldUser) {
      return res.send("User Not Exists");
    }

    //res.send(done)

    const secret = "vamsiReddy";
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "66665h",
    });
    const link = `http://localhost:4000/resetPass/${oldUser.id}/${token}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      debug: true,
      secureConnection: true,
      auth: {
        user: "kotavamsi16@gmail.com",
        pass: "mbjypwpxtpswciyp",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let mailOptions = {
      from: "kotavamsi16@gmail.com",
      to: "vamsi.1255237@gmail.com",
      subject: "forget password",
      text: link,
    };
    console.log(link);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send("email sent check your in box : ");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/resetPass/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await vamsi.findOne({ _id: id });
  if (!oldUser) {
    return res.json({status:"User not exists"});
  }

  const secret = "vamsiReddy";

  try {
    const verify = jwt.verify(token, secret);
   
    //console.log(verify)
    //res.send("verified");
    //res.json({ status: "verified" });
    return res.render("index", { email: verify.email, status: "not verified" });
  } catch (error) {
    //console.log(verify)
    console.log(error);
  }

  //res.send("done")
});

app.post("/resetPass/:id/:token" ,async (req, res) => { 
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body; 
  const oldUser = await vamsi.findOne({ _id:id });

  if (!oldUser) {
    return res.send("user does not exit in database");
  }

  const secret = "vamsiReddy";
  if (password !== confirmPassword) {
    return res.json({status:" password and confirmpassword should be same"});
  }
  try {
    const verify = jwt.verify(token, secret);

    const hass = bcrypt.hashSync(password, 10);
    const conHass = bcrypt.hashSync(confirmPassword, 10);
    await vamsi.updateOne(
      { _id: req.params.id },
      { $set: { password: hass, confirmPassword } }
    );
    res.json({ status: "Password Updated" });

    //res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "something went wrong" });
  }
});

{
  /*

const { confirmPassword, currentPassword, newPassword } = req.body;
    console.log(confirmPassword, currentPassword, newPassword, req.params.id)
    // res.send("Hello there")
    if (!confirmPassword || !currentPassword || !newPassword) {
        return res.status(400).send("Please field cannot be empty")
    }
    const salt = await bcrypt.genSalt();
    const updatedPassword = await bcrypt.hash(newPassword, salt)
    // console.log(!(confirmPassword === newPassword));
    if (!(confirmPassword === newPassword)) return res.status(400).send("Please Enter same password")
    console.log("Checking", confirmPassword == newPassword)
    if (confirmPassword == newPassword) {
        const user = await User.findById({ _id: req.params.id });
        const auth = await bcrypt.compare(currentPassword, user.password);
        console.log("The value of aut", auth)
        if (auth) {
            try {

                const user = await User.updateOne({ _id: req.params.id }, { $set: { password: updatedPassword } })
                res.status(200).send("Password Updated")
            }
            catch (err) {
                res.status(400).send({ err })
            }
        } else {
            res.status(400).send("Password dosen't match")
        }
    }
    else {
        res.status(400).send("Something went wron")
    }

  */
}

app.listen(4000, console.log("it is running on port no 4000"));

