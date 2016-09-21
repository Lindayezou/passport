/// <reference path="../typings/tsd.d.ts"/>
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.end();
});
module.exports = router;
