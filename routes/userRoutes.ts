/// <reference path="../typings/tsd.d.ts"/>
import * as express from "express";
import * as mongoose from 'mongoose';
import { User } from '../models/user';
import * as passport from "passport";
let jwt = require('express-jwt');
let router = express.Router();

router.post('/Register', function(req, res, next) {
	var user:any = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function(err, user) {
		if(err) return next(err);
		res.send("Registration Complete. Please login.");
	});
});

router.post('/Login/Local', function(req, res, next) {
	if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
	passport.authenticate('local', function(err, user, info) {
		console.log(user, err);
		if(err) return next(err);
		if(user) return res.json({token : user.generateJWT()});
		res.status(400).send(info);
	})(req, res, next);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/#/account' }),
  function(req, res) {
		if(req.isAuthenticated()) {
			var token = {token : req.user.generateJWT()};
			console.log(token.token);
			res.redirect('/#/Token/' + token.token);
		} else {
			res.send("You are not authenticated.")
		}
	});

export = router;
