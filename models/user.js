/// <reference path="./../typings/tsd.d.ts"/>
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true },
    email: { type: String, unique: true, lowercase: true },
    passwordHash: String,
    salt: String
});
UserSchema.method('setPassword', function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});
UserSchema.method('validatePassword', function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return (hash === this.passwordHash);
});
UserSchema.method('generateJWT', function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 36500);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: exp.getTime() / 1000
    }, 'SecretKey');
});
var User = mongoose.model("User", UserSchema);
exports.User = User;
