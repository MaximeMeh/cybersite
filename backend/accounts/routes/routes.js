require("dotenv").config();

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const auth = require("../middleware/auth");

const BaseAccountsUri = "/register";
const BaseUsersUri = "/users";
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const Account = require("../model/Account")

//create a new account
router.post(BaseAccountsUri, async (req, res) => {
  const { firstname, lastname, email, password, confPassword, phonenumber, address, status, role } = req.body;
  // if(!password) {
  //   return res
  //           .status(400)
  //           .json({msg: "Please enter a password"});
  // }
  // if(password !== confPassword) 
  //   return res
  //           .status(400)
  //           .json({msg: "Password and Confirm Password do not match"});
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  await Account.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: encryptedPassword,
    phonenumber: phonenumber,
    address: address,
    status: status,
    role: role
  })
    .then(data => {
      res.status(201)
        .json({
          status: 'success',
          data,
          message : `Sucessfully user with email ${data.email} created`
        })
        .send();
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        res.status(500)
        .json({
          status: 'error',
          error,
          message : `Error: ${error}`
        })
        .send();
      }
    });
  });

//Login with an account
router.post("/login", async (req, res) => {

try {
  const user = await Account.findAll({
      where:{
          email: req.body.email
      }
  });
  const match = await bcrypt.compare(req.body.password, user[0].password);
  if(!match) return res.status(400).json({msg: "Wrong Password"});
  const userId = user[0].id;
  const name = user[0].name;
  const emailUser = user[0].email;
  const accessToken = jwt.sign({userId, name, emailUser}, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: '30m'
  });
  const refreshToken = jwt.sign({userId, name, emailUser}, process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: '1d'
  });
  await Account.update({refreshToken: refreshToken},{
      where:{
          id: userId
      }
  });
  
  res.cookie('refreshToken', refreshToken,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
  });
  console.log(res.cookie.refreshToken);
  res.json({ accessToken });
} catch (error) {
  console.log(error);
  res.status(404).json({msg:"Email not found"});
}
});


//Logout user
router.post("/logout",auth, async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Account.findAll({
        where:{
            refreshToken: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Account.update({refreshToken: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
});


// Refresh token
router.get('/token',auth, async (req, res)=>{
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(401);
    const user = await Account.findAll({
        where:{
            refreshToken: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        res.json({ accessToken });
    });
} catch (error) {
    console.log(error);
}
});


//get all users
router.get(BaseUsersUri,auth, (req, res) => {
  Account.findAll()
    .then((accounts) => {
      res.status(200)
        .json({
          status: 'success',
          message : accounts
        })
        .send();
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        res.status(500)
        .json({
          status: 'error',
          error,
          message : `Error: ${error}`
        })
        .send();
      }
    });
  });

//get one user by ID
router.get(BaseUsersUri + "/:id",auth, (req, res) =>{
  Account.findOne({
    where: { id: req.params.id },
  })
    .then((account) => {
      if (account) {
        res.status(200)
        .json({
          status: 'success',
          message : account
        })
        .send();
      } else {
        res.status(404)
        .json({
          status: 'not found',
          message: `Account ${req.params.id} not found`
        })
        .send();
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        res.status(500)
        .json({
          status: 'error',
          error,
          message : `Error: ${error}`
        })
        .send();
      }
    });
  });

//delete one user by ID
router.delete(BaseUsersUri + "/:id",auth, (req, res) =>{
  Account.destroy({
    where: { id: req.params.id },
  })
    .then((account) => {
      if (account) {
        res.status(200)
        .json({
          status: 'success',
          message: `Account ${req.params.id} successfully deleted`
        })
        .send();
      } else {
        res.status(404)
        .json({
          status: 'not found',
          message: `Account ${req.params.id} not found`
        })
        .send();
      }
    })
    .catch((error) => {
      if (error) {
        res.status(500)
        .json({
          status: 'error',
          error,
          message : `Error: ${error}`
        })
        .send();
      }
    });
  });

// update one user by ID
router.put(BaseUsersUri + "/:id", jsonParser,auth, (req, res) =>{
  Account.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      referralcode: req.body.referralcode,
      password: req.body.password,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((account) => {
      if (account) {
        res.status(200)
        .json({
          status: 'success',
          data: account,
          message: `Account ${req.params.id} successfully updated`
        })
        .send();
      } else {
        res.status(404)
        .json({
          status: 'not found',
          message: 'User not found'
        })
        .send();
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        res.status(500)
        .json({
          status: 'error',
          error,
          message : `Error: ${error}`
        })
        .send();
      }
    });
  });



module.exports = router;
