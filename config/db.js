const mongoose = require("mongoose");
const logger = require("../config/logger.js");

// Use process.env.MONGO_URI to match GitHub Secrets
const mongoDBURI = process.env.MONGO_URI || process.env.MONGOURL;

const connectToMongo = async () => {
  try {
    if (!mongoDBURI) {
      throw new Error("MONGO_URI is not set!");
    }

    const connect = await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      "✅ Connected to Mongo Successfully!",
      connect.connection.host,
      connect.connection.name
    );
    logger.info(
      `✅ Connected to Mongo Successfully! Host: ${connect.connection.host}, DB Name:${connect.connection.name}`
    );
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    logger.error(`❌ Connected to Mongo Failed!`);
    process.exit(1);
  }
};

module.exports = { connectToMongo, mongoose };
