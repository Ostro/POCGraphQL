'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String},
    friends: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', UserSchema);

