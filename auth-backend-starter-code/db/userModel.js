const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: [true, "Email Exist"],
    },
    
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
});

// Create a Users collection if there is no collection with that name
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);