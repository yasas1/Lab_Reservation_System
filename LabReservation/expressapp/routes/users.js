var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

//GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});  

router.post('/register', function(req, res, next) {
  addToDB(req,res);
});

async function addToDB(req,res){
  var user = new User({
    name:req.body.name,
    username:req.body.username,
    password:User.hashPassword(req.body.passwordFormGroup.password),
    email:req.body.email,
    
  });
  try{
    doc = await user.save();

    return res.status(201).json(doc);
  }
  catch(err){
    return res.status(501).json(err);
  }
    
}

router.post('/login',function(req,res,next){

  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json("err"); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message: 'Login Success'});
    });
  })(req, res, next);

});

router.get('/checkposition/:username',function(req,res,next){

  User.find({ username:req.params.username}).select('position').exec(function (err, position) {
    if (err){
        res.send(err);
    }
    else {
        res.json(position);
       // res.send(date);
    }
  });
});
/*
router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser,function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
});

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message: 'Unauthorized Request'});
}*/


module.exports = router;
