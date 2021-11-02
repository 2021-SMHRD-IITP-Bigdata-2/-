const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/login.html")
});

router.get("/register", (req, res) => {

    res.sendFile(__dirname + "/public/join.html")
});

module.exports = router;
