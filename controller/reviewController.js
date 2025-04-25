
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

export function getAllReviews(req,res){
    if(req.user==null || req.user.role!="admin"){
        Review.findOne({isApproved:true}).then((reviews)=>{
            res.json(reviews)
        })
        return
    }else{
        Review.findOne().then((reviews)=>{
            res.json(reviews)
        })
    }
}

export function approveReviews(req,res){
    const email=req.params.email

    if(req.user.role=="admin"){
        Review.updateOne({email:email},{isApproved:true}).then(()=>{
            res.json({
                message:"Review approved successfully"
            }).catch((error)=>{
                error:"Error in approving the review"
            })
        })
    }else(res.json({
        message:"UNAUTHORIZED!! Only admins can approve reviews"
    }))
}

export function deleteReviews(req,res){
    const email=req.params.email;

    if(req.user==null){
        res.status(401).json({
            message:"Please log in and try again"
        })
    }

    if(req.user.role=="admin"){
        Review.deleteOne({email:email}).then(()=>{
            res.json({
                message:"Review deleted successfully"
            })
        }).catch((error)=>{
            error:"Unable to delete the review"
        })
    }

    if(req.user.role=="customer"){

        if(req.user.email==email){
            Review.deleteOne({email:email}).then(()=>{
                message:"Review deleted successfully"
            }).catch((error)=>{
                error:"Unable to delete the message"
            })
        }
    }
    Review.deleteOne({email:email})
}