const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
    cors({
        origin: ["http://localhost:8000", "https://nexus-project3.onrender.com"]
    })
);
const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb+srv://ishankhare30:9xKc46nqbDBqjIts@cluster0.56jacre.mongodb.net/?retryWrites=true&w=majority");


mongoose.connection.on("connected", () => {
    console.log("DB connected");
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Message: String,
});

const User = new mongoose.model("User", userSchema);

// Make a POST request at http://localhost:8000/contact/ 
app.post("/contact", (req, res) => {
    const { name, email, Message } = req.body;
    //check email
    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                res.status(200).json({ message: "Your message is already received. We will get back to you soon!" });
            } else {
                const newUser = new User({
                    name,
                    email,
                    Message,
                });
                return newUser.save();
            }
        })
        .then(() => {
            res.status(200).json({ message: "Thank you for your interest. We will get back to you soon!" });
        })
        .catch((err) => {
            // If an error occurs, send a 500 status with an error message
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

app.listen(PORT, function (req, res) {
    console.log(`Listening at ${PORT}`)
});


// 9xKc46nqbDBqjIts