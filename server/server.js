require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
// 1. Import your new lead routes here
const leadRoutes = require("./routes/leadRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Mini CRM Backend is Running 🚀");
});

// 2. Add your new API routes link right here!
app.use("/api/leads", leadRoutes);

// ===========================================
// PORT & Listen
// ===========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});