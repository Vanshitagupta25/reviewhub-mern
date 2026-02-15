const Company = require("../models/company");
const Review = require("../models/review");
//add company
exports.addCompany = async(req,res) => {
  try{
    const { name, city, location, foundedOn } = req.body;

    const company = await Company.create({
      name,
      city,
      location,
      foundedOn,
      logo: req.file ? req.file.filename : null,
    });

    res.status(201).json(company);
    
  }catch(err){ 
    res.status(500).json({message: err.message});
  }
};

//get companies
//search & filter funcationality
exports.getCompanies = async (req, res) => {
  try {
    const { search, city, location } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const companies = await Company.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "reviews", // MongoDB collection name
          localField: "_id",
          foreignField: "companyId", // VERY IMPORTANT
          as: "reviews",
        },
      },
      {
        $addFields: {
          reviewCount: { $size: "$reviews" },
          averageRating: { $avg: "$reviews.rating" },
        },
      },
    ]);

    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get single company
exports.getSingleCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const reviews = await Review.find({ companyId: req.params.id });

    const reviewCount = reviews.length;

    const averageRating =
      reviewCount > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        : 0;

    res.json({
      ...company._doc,
      reviewCount,
      averageRating,
      reviews,
    });
  } catch (err) {
    console.error("Error in getSingleCompany:", err);
    res.status(500).json({ message: err.message });
  }
};