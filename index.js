import express from "express";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from "./config/dbConnection.js";



import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";


let app=express();
app.use(bodyParser.json());
dbConnect();

app.use((req,res,next)=>{
    let token=req.header("Authorization");
    console.log(token);
    

    if(token!=null){
        token=token.replace("Bearer ","")
        console.log(token);

        jwt.verify(token,process.env.JWT_SECRET,
            (err,decoded)=>{
                if(!err){
                    
                    
                    req.user=decoded;
                }
                
                
            });
    }
    //res.json({user:req.user})
    next();
    
})






app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

const PORT=process.env.PORT || 7002
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})