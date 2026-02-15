const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addCompany,
  getSingleCompany,
  getCompanies,
} = require("../controllers/companyController"
);


router.post("/", upload.single("logo"), addCompany);
router.get("/", getCompanies);
router.get("/:id", getSingleCompany);

module.exports = router;

