import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const dbConnect= async()=>{

    try{ const connect=await mongoose.connect(process.env.CONNECTION_STRING);
    
        console.log(`Connection Successfull: ${connect.connection.host},${connect.connection.name}`);
    }catch(err){
        console.log(err);
        process.exit(1);
        
    }
   
    }

    export default dbConnect;
        




