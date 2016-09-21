/// <reference path="typings/tsd.d.ts"/>
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var socketio = require("socket.io");
var mongoose = require("mongoose");
var passport = require("passport");
var port = process.env.PORT || 3000;
var app = express();
var http = require("http").Server(app).listen(port);
var io = socketio(http);
require("./models/user");
require("./config/passport");
mongoose.connect("mongodb://localhost/passportApp");
var userRoutes = require("./routes/userRoutes");
app.use(passport.initialize());
app.use(express.static(__dirname + "/bower_components"));
app.use(express.static(__dirname + "/public"));
app.engine('.html', require("ejs").renderFile);
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname));
app.set("view options", { layout: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/v1/api/', userRoutes);
app.get("/", function (req, res) {
    res.render("index.html");
});
io.on('connection', function (socket) {
    socket.on('new-msg', function (data) {
        socket.broadcast.emit("push-msg", data);
    });
});
