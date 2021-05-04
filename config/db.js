const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");


async function connectDB(){
    try{
        await mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false } );
        console.log("MongoDB is connected...")
    }

    catch(err){
        console.log(err.message);
        //Exit process by force
        process.exit(1);
    }

};

module.exports = connectDB;
