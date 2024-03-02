// Ensure the correct MongoDB Atlas URI is provided
const DB_URI = "mongodb+srv://shivamshaw9005:project@cluster0.5pilrv9.mongodb.net/your-database-name";

const mongoose = require("mongoose");

// Define the schema for BitMoji
const BitMojiSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Assuming userId is required and should be an ObjectId
    bucketURI: { type: String, required: true } // Assuming bucketURI is required and should be a String
});

// Create and export the BitMoji model
const BitMoji = mongoose.model("BitMoji", BitMojiSchema);
module.exports = BitMoji