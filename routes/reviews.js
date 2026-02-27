const { render } = require('ejs');
const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const ExpressError=require('../utils/expressError.js');
const { validateReview, isLoggedIn ,isReviewOwner} = require('../middleware.js');

const Review=require('../models/review.js');
const Listing=require('../models/listing.js');

const reviewController=require('../controllers/reviews.js');

//post review route
router.post('/',isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete('/:reviewId',isLoggedIn, isReviewOwner, wrapAsync(reviewController.destroyReview));

module.exports=router;