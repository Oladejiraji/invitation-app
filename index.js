const express = require('express')
require('dotenv').config()
const passport = require('passport')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('./config/Google-auth')(passport)

const app = express()

//middleware
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
mongoose.connect(process.env.MONGO_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{console.log('MongoDB connected');})

//passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/v1/auth', require('./routes/auth'))
app.use('/v1/user', require('./routes/user'))



app.listen(process.env.PORT, ()=>{
    console.log(`running on PORT ${process.env.PORT}`);
})

