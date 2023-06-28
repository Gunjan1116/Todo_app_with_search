const express= require("express");
const {register,login}=require("../controller/userController")

const userRoute=express.Router();


//Route to add new user
userRoute.post("/register",register)

//Route to login a user
userRoute.post("/login",login)


module.exports={
    userRoute
}

// {
//     "name":"gunjan kumar",
//     "email":"kumargunjan1116@gmail.com",
//     "password":"",
//   }
