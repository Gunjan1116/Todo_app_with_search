const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {Usermodel} =require("../models/userModel");

const register=async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length>0){
            return res.status(400).json({"msg":"You are already register"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("error from hashing password",err);
                res.status(500).json({"msg":"error from hashing password"})
            }else{
                let registerData=new Usermodel({name,email,password:hash});
                await registerData.save();
                res.status(201).json({"msg":"Successfully register"})
            }
        })
    } catch (error) {
        console.log("error from register route",error);
        res.status(500).json({"msg":"error in register a user"})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length==0){
            return res.status(400).json({"msg":"register first"})
        }else{
            bcrypt.compare(password,reqData[0].password,async(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:reqData[0]._id,email:reqData[0].email},process.env.Key);
                    res.status(200).json({"msg":"Login Success","token":token,"name":reqData[0].name})
                }else{
                    res.status(401).json({"msg":"Wrong Credentials"})
                }
            })
        }

    } catch (error) {
        console.log("error from login route",error);
        res.status(500).json({"msg":"error in login a user"})
    }
}

module.exports={
    register,
    login
}