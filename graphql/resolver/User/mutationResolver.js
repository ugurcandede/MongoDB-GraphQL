const UserModel = require("../../../db_models/UserModel")
const { pubsub } = require("../../PubSubHelper")

module.exports = {
    RootMutation: {
        createUser: async (parent, { user }, context, info) => {
            const newUser = await new UserModel({
                name: user.name,
                email: user.email,
                password: user.password
            });

            return new Promise((resolve, reject) => {
                newUser.save((err, res) => {
                    pubsub.publish('User', { user: res });
                    err ? reject(err) : resolve(res);
                });
            });
        },
    },
}
