const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./store/data.js");


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

const PORT  = process.env.PORT || 5000;

app.get("/" , (req,res) => {
  res.send("server is working");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port, ${PORT}`);
})