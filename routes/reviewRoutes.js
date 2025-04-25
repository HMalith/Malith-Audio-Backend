import express from "express";
import { addReview, approveReviews, deleteReviews, getAllReviews } from "../controller/reviewController.js";

const reviewRouter=express.Router();

reviewRouter.post('/',addReview)
reviewRouter.get('/getreviews',getAllReviews)
reviewRouter.delete('/:email',deleteReviews)
reviewRouter.put('/approve/:email',approveReviews)

export default reviewRouter;