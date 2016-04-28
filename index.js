'use strict';

const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

mongoose.connect('mongodb://localhost/graphql-test');

const app = express();

const schema = require('./schemas/simpleUserSchema');

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.use(graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(process.env.NODE_PORT || 3000);
console.log('app started');
