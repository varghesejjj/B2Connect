const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");

const auth = require("../controllers/auth.controller")
const ip = require("../controllers/ip.controller")
var multer = require('multer')

// multer for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname == "profilePhoto")
            cb(null, './tmp/profilePhoto')
    },
    filename: function (req, file, cb) {
            cb(null, req.params.id + '-' + file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

// Signup Route
router.post("/createUser", upload.fields([{ name: "profilePhoto" }]), auth.signup);

// Login Route
router.post("/auth/login", auth.signin);

// Get Ip Address Details
router.post("/getIpDetails", ip.getIpinfo);

// Get users
router.get("/getUsers", auth.getUsers)

// Get single user
router.get("/getUser/:id", auth.getUser)

module.exports = router