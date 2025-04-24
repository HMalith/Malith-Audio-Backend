import { json } from "body-parser";
import Review from "../models/reviewModel.js";

export function addReview(req,res){

    if(req.user==null){
        res.status(401).json({
            message:"Please login and try again"
            
        })
        return
    }

    const data=req.body;

    data.name=req.user.firstName+" "+req.user.lastName;
    data.email=req.user.email;
    data.profilePicture=req.user.profilePicture;

    const newReview=Review(data);

    newReview.save().then(
        ()=>{
            res.json({
                message:"Review added successfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                error:"Error in adding the review"
            })
        }
    )

}