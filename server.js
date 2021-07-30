const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')


//load env vars
dotenv.config({path: './config/config.env'})

//Mongodb connection
const connectDB = require('./config/db');
connectDB();

//route files
const task = require('./routes/task')

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

//Mount Routers
app.use(task);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server listening on ${PORT}`))