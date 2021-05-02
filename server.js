const express = require('express');
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;


//connect DB
connectDB();

//unit middleware
app.use(express.json({extened:false}));

//init routes 
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req,res)=>{
    res.send("hello there")
});


app.listen(PORT, ()=>{
    console.log(`Server Started on port ${PORT}`)
});

