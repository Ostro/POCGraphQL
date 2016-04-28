'use strict';

const graphql = require('graphql');
const User = require('../models/user');


const SimpleUserType = new graphql.GraphQLObjectType({
    name: 'SimpleUser',
    fields: function() {
        return {
            username: { type: graphql.GraphQLString},
            firstname: { type: graphql.GraphQLString},
            lastname: { type: graphql.GraphQLString},
            email: { type: graphql.GraphQLString},
            friends: {
                type: new graphql.GraphQLList(SimpleUserType),
                resolve: function(user) {
                    return user.friends.map(function(user_id) {
                        return User.findById(user_id);
                    });
                }
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'SimpleUserQuery',
        fields: function() {
            return {
                user: {
                    type: SimpleUserType,
                    args: {
                        id: {
                            type: graphql.GraphQLString
                        }
                    },
                    resolve: function(root, args) {
                        return User.findById(args.id);
                    }
                }  
            };
        }
    })
});
