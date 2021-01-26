const queryResolver = require("./queryResolver")
const mutationResolver = require("./mutationResolver")
const subscriptionResolver = require("./subscriptionResolver")
const RefResolver = require("./RefResolver")

const RootUserResolver = {
    ...queryResolver,
    ...mutationResolver,
    ...subscriptionResolver,
    ...RefResolver
}

module.exports = RootUserResolver