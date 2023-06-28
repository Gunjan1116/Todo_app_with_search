const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {Usermodel} =require("../models/userModel");

const register=async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length>0){
            return res.json({"msg":"You are already register"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("error from hashing password",err);
                res.json({"msg":"error from hashing password"})
            }else{
                let registerData=new Usermodel({name,email,password:hash});
                await registerData.save();
                res.json({"msg":"Successfully register"})
            }
        })
    } catch (error) {
        console.log("error from register route",error);
        res.json({"msg":"error in register a user"})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length==0){
            return res.json({"msg":"register first"})
        }else{
            bcrypt.compare(password,reqData[0].password,async(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:reqData[0]._id,role:reqData[0].role,email:reqData[0].email},process.env.Key);
                    res.json({"msg":"Login Success","token":token,"role":reqData[0].role,"name":reqData[0].name})
                }else{
                    res.json({"msg":"Wrong Credentials"})
                }
            })
        }

    } catch (error) {
        console.log("error from login route",error);
        res.json({"msg":"error in login a user"})
    }
}

module.exports={
    register,
    login
}