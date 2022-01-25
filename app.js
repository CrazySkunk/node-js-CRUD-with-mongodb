const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express()
const db = require('./config/db').DATABASE

//Database connection
mongoose.connect(db,{useNewUrlParser:true})
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log(`Database connection failed, ${err}`,err);
    });

const port = process.env.PORT || 5000
app.use(cors());
app.use(bodyParser.json());
/*
//initialize public directory
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});
 */


app.get('/',(req,res)=>{
    res.send('Server is up and running on port 5000');
});

const postRoutes = require('./routes/apis/posts');
app.use('/api/posts',postRoutes);

app.listen(port,()=>{
    console.log('Server started successfully on port ',port);
});
