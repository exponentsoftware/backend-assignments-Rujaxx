const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true,'Please add a name'],
    },
    title:{
        type : String,
        required : [true,'Please add a task title'],
    },
    desc:{
        type : String,
        required : [true,'Please add a desc'],
    },
    isComplete:{
        type : Boolean,
        default : false
    },
    category:[String],
    createdAt :{
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
},{timestamps:true})


// TaskSchema.pre('save', function(next) {
//     this.updated = Date.now();
//     return next();
// });

mongoose.model('Task', TaskSchema);