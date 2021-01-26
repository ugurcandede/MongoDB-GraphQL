const queryResolver = require("./queryResolver")
const mutationResolver = require("./mutationResolver")
const subscriptionResolver = require("./subscriptionResolver")
const RefResolver = require("./RefResolver")

const RootPostResolver = {
    ...queryResolver,
    ...mutationResolver,
    ...subscriptionResolver,
    ...RefResolver
}

module.exports = RootPostResolver