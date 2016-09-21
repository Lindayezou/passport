/// <reference path="../typings/tsd.d.ts"/>
var express = require("express");
var user_1 = require('../models/user');
var passport = require("passport");
var jwt = require('jsonwebtoken');
var router = express.Router();
router.post('/Register', function (req, res, next) {
    var user = new user_1.User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err)
            return next(err);
        res.send("Registration Complete. Please login.");
    });
});
router.post('/Login/Local', function (req, res, next) {
    if (!req.body.username || !req.body.password)
        return res.status(400).send("Please fill out every field");
    passport.authenticate('local', function (err, user, info) {
        console.log(user);
        if (err)
            return next(err);
        if (user)
            return res.json({ token: user.generateJWT() });
        return res.status(400).send(info);
    })(req, res, next);
});
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/#/account' }), function (req, res) {
    if (req.isAuthenticated()) {
        var token = { token: req.user.generateJWT() };
        console.log(token.token);
        res.redirect('/#/Token/' + token.token);
    }
    else {
        res.send("You are not authenticated.");
    }
});
module.exports = router;
