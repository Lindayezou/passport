/// <reference path="typings/tsd.d.ts"/>
import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");
import socketio = require("socket.io");
import mongoose = require("mongoose");
import passport = require("passport");
let port = process.env.PORT || 3000;
let app = express();
let http = require("http").Server(app).listen(port);
let io = socketio(http);
require("./models/user");
require("./config/passport");
mongoose.connect("mongodb://localhost/passportApp");
let userRoutes = require("./routes/userRoutes");
app.use(passport.initialize());
app.use(express.static(__dirname + "/bower_components"));
app.use(express.static(__dirname + "/public"));
app.engine('.html', require("ejs").renderFile);
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname));
app.set("view options", { layout: false });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/v1/api/', userRoutes);

app.get("/", function(req, res) {
	res.render("index.html");
});








io.on('connection', function (socket) {
  socket.on('new-msg', function (data) {
		socket.broadcast.emit("push-msg", data);
  });
});
