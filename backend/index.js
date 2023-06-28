const express=require("express");
const redis=require("redis");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
require("dotenv").config();


const app=express();

app.use(express.json());

app.get("/",async(req,res)=>{
    res.json({"msg":"Welcome to Home page of todo API"})
})

app.use("/user",userRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
        console.log("Not able to connect to DB");
        console.log(error);
    }
})