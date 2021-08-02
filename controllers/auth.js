const User = require('../models/User')
const asyncHandler = require('../middleware/async');
const { token } = require('morgan');

// @desc      register a user
// @route     POST /api/v1/auth/register
// @access    Public

exports.register = asyncHandler(async (req, res, next) => {
    const { username,email,password,phone,role } = req.body;


    //Create a user
    const user = await User.create({
        username,
        email,
        password,
        phone,
        role
    })

    //create token
    const token = user.getSignedJwtToken()

    res.status(201).json({
      success:true,
      data: user,
      token: token  
    })    
  });

// @desc      login a user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email,password } = req.body;

  //Validate Email and password
  if (!email || !password){
    return res.status(404).json({success: false, message : "user not found"})
  }

  //login a user
  const user = await User.findOne({ email }).select('+password')

  //check user
  if (!user){
    return res.status(404).json({success: false, message : "user not found"})
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch){
    return res.status(404).json({success: false, message : "enter valid credentials"})
  }

  //create token
  const token = user.getSignedJwtToken()

  res.status(200).json({
    success:true,
    data: user,
    token: token
  })    
});
