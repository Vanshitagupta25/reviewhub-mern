const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    foundedOn: {
      type: Date,
      required: true,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true}
);
module.exports = mongoose.model("Company", companySchema);