
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        required:true,
        enum:["admin","customer"],
        default:"customer"

    },

    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        requied:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }

    

},
{
timestamps:true
})
const User=mongoose.model("users",userSchema)

export default User;