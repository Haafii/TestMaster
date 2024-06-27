const express  = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');
const connectDb = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const questionRoutes = require('./routes/questionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');





connectDb();
const app = express();
const port =  8501;


app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/test', testRoutes);
app.use('/question', questionRoutes);
app.use('/submit', submissionRoutes);





app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})