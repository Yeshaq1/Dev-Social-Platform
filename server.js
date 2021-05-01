const express = require('express');
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req,res)=>{

    res.send("hello there")
});


app.listen(PORT, ()=>{
    console.log(`Server Started on port ${PORT}`)
});

