const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
  likeReview,
} = require("../controllers/reviewController");

router.post("/:companyId", addReview);
router.get("/:companyId", getReviews);
router.get("/like/:reviewId", likeReview);

module.exports = router;