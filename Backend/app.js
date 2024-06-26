const express  = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');
const connectDb = require('./config/dbConnection');



connectDb();
const app = express();
const port =  8501;


app.use(cors());
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})