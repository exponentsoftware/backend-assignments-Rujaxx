const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


//load env vars
dotenv.config({path: './config/config.env'})

//Mongodb connection
const connectDB = require('./config/db');
connectDB();

//route files
const task = require('./routes/task')
const auth = require('./routes/auth')

const app = express();

// Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

//Mount Routers
app.use(task);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server listening on ${PORT}`))