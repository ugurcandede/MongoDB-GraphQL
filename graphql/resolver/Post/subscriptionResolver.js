const { pubsub } = require('../../PubSubHelper');
module.exports = {
    RootSubscription: {
        post: {
            subscribe(parent, args, ctx, info) {
                return pubsub.asyncIterator('Post')
            }
        }
    }
}