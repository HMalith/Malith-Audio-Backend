
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";


export function registerUser(req,res){

    const data=req.body
    data.password=bcrypt.hashSync(data.password,10)
    const newUser=new User(data)

    newUser.save().then(
        ()=>{
            res.json({
                message:"User registered successfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({message:"User registration unsuccessful"})

        }
    )
}

export function loginUser(req,res){
    const data=req.body;

    User.findOne({
        email:data.email
        
    }).then(
        (user)=>{
            if(user==null){
                res.status(404).json({error:"User not found"})
            }else{
                

                const isPAsswordCorrect=bcrypt.compareSync(data.password,user.password)
                
                if(isPAsswordCorrect){

                    const token=jwt.sign({
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        profilePicture:user.profilePicture,
                        role:user.role
                    },process.env.JWT_SECRET)
                    res.json({message:"Login successfull",token:token})
                }else{
                    res.json({message:"Password Incorrect"})
                }
                
            }
        }
    )
}