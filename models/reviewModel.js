import mongoose from "mongoose";

const reviewSchema =new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true

    },
    name:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true,
        default:Date.now
    },
    profilePicture:{
        type:String,
        require:true
        
    },
    isApproved:{
        type:Boolean,
        require:true,
        default:false
    }

})
const Review=mongoose.model("Reviews",reviewSchema)
export default Review;