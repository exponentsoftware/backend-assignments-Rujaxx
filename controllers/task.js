const Task = require('../models/Task')
const asyncHandler = require('../middleware/async')

// @desc      Get all tasks
// @route     GET /api/v1/tasks
// @access    Public

exports.getTasks = asyncHandler(async (req, res, next) => {
  let query 

  query = Task.find(req.query)

  //Sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(",").join(" ")
  }else{
    query = query.sort("-createdAt")
  }

  const tasks = await query;

   if(!tasks.length){
    return res.status(404).json({success: false, message : "task not found"})
  }
    res.status(200).json({success: true,count : tasks.length, data : tasks});
    
  });

// @desc      Get a task
// @route     GET /api/v1/tasks/:id
// @access    Public

exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if(!task){
    return res.status(404).json({success: false, message : "task not found"})
  }

  res.status(200).json({
    success:true,
    data: task
  })
  });

// @desc      create a task
// @route     POST /api/v1/tasks
// @access    Public

exports.addTask = asyncHandler(async (req, res, next) => {
    const task = await Task.create(req.body);

    res.status(201).json({
      success:true,
      data: task
    })    
  });

// @desc      update a task
// @route     PUT /api/v1/task/:id
// @access    Public

exports.updateTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    validators: true
  });

  if(!task){
    return res.status(404).json({success: false, message : "task not found"})
  }

  res.status(201).json({
    success:true,
    data: task
  })
  });

// @desc      Get all tasks
// @route     DELETE /api/v1/tasks/:id
// @access    Public

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if(!task){
    return res.status(404).json({success: false, message : "task not found"})
  }

  res.status(200).json({
    success:true,
    message: "deleted succesfully"
  })
  });
  
