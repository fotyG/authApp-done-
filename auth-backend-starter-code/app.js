const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { dbConnect } = require("./db/dbConnect");
const User = require("./db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

// execute database connection
dbConnect();

// Cors Error fix
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
})

// body parser configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    next();
});

app.post("/register", async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = new User({
            email: request.body.email,
            password: hashedPassword,
        });
        const newUser = await user.save();
        response.status(201).send({
            message: "User Created Successfully",
            newUser,
        });
    } catch (error) {
        response.status(500).send({
            message: "Error creating user",
            error,
        });
    }
});

app.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });

        if (!user) {
            return response.status(404).send({
                message: "Email not found",
            });
        }

        const passwordCheck = await bcrypt.compare(
            request.body.password,
            user.password
        );

        if (!passwordCheck) {
            return response.status(400).send({
                message: "Passwords do not match",
            });
        }

        const token = jwt.sign( //await is not needed here, it's a synchronous function
            {
                userId: user._id,
                userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        );

        response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
        });

    } catch (error) {
        response.status(404).send({
            message: "Error logging in",
            error,
        });
    }
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

module.exports = app;
