const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Unable to connect to MongoDB")
        console.log(error);
    }
};
