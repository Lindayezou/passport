/// <reference path="../typings/tsd.d.ts"/>
import express = require("express");
let router = express.Router();

router.get('/', function(req, res) {
  res.end();
});

export = router;
