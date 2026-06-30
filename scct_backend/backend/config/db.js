const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("mongodb URL ",process.env.MONGO_URI)
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
          }
};

module.exports = connectDB;