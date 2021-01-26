const { pubsub } = require('../../PubSubHelper');
module.exports = {
    RootSubscription: {
        user: {
            subscribe(parent, args, ctx, info) {
                return pubsub.asyncIterator('User')
            }
        }
    }
}