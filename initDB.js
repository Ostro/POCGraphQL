'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/graphql-test');

const User = require('./models/user');

Promise.all([
    User.create({
        username: 'foo_bar',
        firstname: 'foo',
        lastname: 'bar',
        email: 'foo@bar.com'
    }),
    User.create({
        username: 'toto_tata',
        firstname: 'toto',
        lastname: 'tata',
        email: 'toto@tata.com'
    })
])
    .then(function(users) {
        return User.create({
            username: 'hello_world',
            firstname: 'hello',
            lastname: 'world',
            email: 'hello@world.com',
            friends: users.map(function(user) { return user._id;})
        })
    })
    .then(function() {
        mongoose.disconnect();
    })
;
