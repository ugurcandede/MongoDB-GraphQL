const { mergeResolvers } = require("graphql-tools")

const User = require("./User")
const Post = require("./Post")

const RootResolver = [
    User,
    Post
]

module.exports = mergeResolvers(RootResolver)