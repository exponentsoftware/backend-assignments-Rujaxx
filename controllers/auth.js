const User = require('../models/User')
const asyncHandler = require('../middleware/async')

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

    res.status(201).json({
      success:true,
      data: user
    })    
  });
