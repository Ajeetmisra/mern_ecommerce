const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const bcrypt = require("bcrypt");
const { has } = require("lodash");
var userInfo;
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    // Store hash in your password DB.
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      });

      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            err: "NOT able to save user in db",
          });
        }
        return res.json(user);
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // console.log("password", password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "email does not exist",
      });
    }
    userInfo = user;
    // console.log("USER", userInfo);
    // // const AUTH = user.authenticate(password);
    // console.log("AUTH", AUTH);
    // if (!user.authenticate(password)) {
    //   return res.status(401).json({
    //     error: "password does not match",
    //   });
    // }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.json({
          message: "authentication falied",
        });
      }
      if (result) {
        const token = jwt.sign({ _id: user._id }, "ajeetmishra");
        user.session_token = token;
        user.save();
        const { _id, name, email, role, session_token } = user;
        return res.json({
          token,
          user: { _id, name, email, role, session_token },
        });
      }
    });
  });
};

exports.signout = (req, res) => {
  userInfo.session_token = "";
  console.log("USER after signout", userInfo);
  res.json({
    message: "User Signout Suceesfully",
  });
};

// protected route
// expressJwt checks wheather the user signedin or not
// we dont need to write logic for that like wheather the token that is present in the data base is
// matches with the token present in the local storage
// this automatically acheive that scenario
//  we need to send the token in authorization header
exports.isSignedIn = expressJwt({
  secret: "ajeetmishra",
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id;
  // console.log("REQ.PROFILE", req.profile);
  // console.log("REQ.PROFILE STATUS", checker);
  // console.log("REQ.AUTH", req.auth);

  if (!checker) {
    res.send("ACCESS DENIED");
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.send("ACCESS DENIED! your are not an admin");
  }
  next();
};
