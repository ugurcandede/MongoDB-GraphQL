const { mergeTypeDefs } = require("graphql-tools")

const UserTypes = require("./User")
const PostTypes = require("./Post")

const RootTypes = [
    UserTypes,
    PostTypes
]

module.exports = mergeTypeDefs(RootTypes, { all: true })