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

    sendResponse(user, 200 , res);   
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

 sendResponse(user, 200 , res)
});


//Get token from model, create cookie and send response
const sendResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  if(process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
      success : true,
      token
    })
}