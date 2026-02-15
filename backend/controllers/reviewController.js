const mongoose = require("mongoose");
const Review = require("../models/review");
const Company = require("../models/company");

//add reviews
exports.addReview = async(req,res) => {
  try{
    const { companyId } = req.params;
    const { fullName, subject, reviewText, rating } = req.body;

    //add validations
    //if company id is invalid
    if(!mongoose.Types.ObjectId.isValid(companyId)){
      return res.status(400).json({message: "Invalid Company ID"});
    }
    // if company does'nt exist
    const company = await Company.findById(companyId);
    if(!company){
      return res.status(404).json({ message: "Company not found" });
    }
    //missing filds
    if(!fullName || !subject || !reviewText || rating == null){
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    //set rating range
    if(rating < 1 || rating > 5){
      return res.status(400).json({
        message:"Rating must be between 1 and 5",
      })
    }

    const review = await Review.create({
      companyId,
      fullName,
      subject,
      reviewText,
      rating: Number(rating),
      
    });

    //calculate average rating
    const stats = await Review.aggregate([
      {
        $match:{
          companyId:new mongoose.Types.ObjectId(companyId)
        }
      },
      {
        $group:{
          _id:"$companyId",
          averageRating: {$avg:"$rating"},
          reviewCount: {$sum: 1}
        }
      }
    ]);

    if(stats.length > 0){
      await Company.findByIdAndUpdate(companyId,{
        averageRating: Math.round(stats[0].averageRating*10)/10,
        reviewCount: stats[0].reviewCount
      });
    }
   

   res.status(201).json(review);
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};
 //get reviews
 // sorting options
exports.getReviews = async(req,res) => {
  try{
    const { companyId } = req.params;
    const { sort } = req.query;

    let sortOption = { createdAt: -1};

    if(sort === "rating") sortOption = { rating: -1};
    if(sort === "newest") sortOption = { createdAt: -1};
    if(sort === "relevance") sortOption = { likes: -1};

    const reviews = await Review.find({companyId}).sort(sortOption);

    res.json(reviews);

  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

 //like reviews
 exports.likeReview = async(req,res) => {
  try{
    const review = await Review.findByIdAndUpdate(req.params.reviewId,
      { $inc: { likes: 1} },
      { new: true }
    );
    res.json(review);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}
