const User = require("../models/user");


const jwt = require("jsonwebtoken");
const fs = require('fs');
const user = require("../models/user");


// Signup
exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: "Please enter the email and password",
        });
    } else {
        try {
            let newuser = new User();
            fs.renameSync(req.files.profilePhoto[0].path, req.files.profilePhoto[0].path.replace('undefined', newuser._id));
            var profilePhotoPath = req.files.profilePhoto[0].path.replace("undefined", newuser._id)
            profilePhotoPath = profilePhotoPath.substring(profilePhotoPath.indexOf("./"))
            newuser.username = newuser._id
            newuser.firstName = req.body.firstName;
            newuser.lastName = req.body.lastName;
            newuser.role = req.body.role;
            newuser.email = req.body.email;
            newuser.dateofregistration = new Date();
            newuser.password = req.body.password;
            newuser.photo = profilePhotoPath;
            newuser.gender = req.body.gender;
            newuser.phone = req.body.phone;
            newuser.mobile = req.body.mobile;
            await newuser.save();
            res.json({
                success: true,
                message: "Successfully created new user",
            });
        } catch (err) {
            console.log(err)
            res.status(201).json({
                success: false,
                message: err.message,
            });
        }
    }
}

// signin
exports.signin = async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) {
            res.status(201).json({
                success: false,
                message: "Authentication failed, User not found",
            });
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
                    expiresIn: 604800, // 1 week
                });
                let name = foundUser.firstName + " " + foundUser.lastName
                res.json({ success: true, token: token, name: name, role: foundUser.role, id: foundUser._id });
            } else {
                res.status(201).json({
                    success: false,
                    message: "Authentication Failed, Wrong password",
                });
            }
        }
    } catch (err) {
        res.status(201).json({
            success: false,
            message: err.message,
        });
    }
}

// getUser detail
exports.getUser = async (req, res) => {
    var id = req.params.id
    try {
        let foundUser = (await User.findOne({ _id: id }));
        if (foundUser) {
            res.json({
                success: true,
                user: foundUser,
            });
        }
    } catch (err) {
        res.status(201).json({
            success: false,
            message: err.message,
        });
    }
}

// Get all users
exports.getUsers = async (req, res) => {
    try {
        let users = null
        users = (await User.find())
        if (users) {
            res.json({
                success: true,
                users: users,
            });
        }
    } catch (err) {
        res.status(201).json({
            success: false,
            message: err.message,
        });
    }
}