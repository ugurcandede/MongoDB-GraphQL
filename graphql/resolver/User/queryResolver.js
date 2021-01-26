const UserModel = require("../../../db_models/UserModel");

module.exports = {
    RootQuery: {
        user: async (parent, { _id }, context, info) => {
            return await UserModel.findOne({ _id }).exec();
        },
        users: async (parent, args, context, info) => {
            const users = await UserModel.find({})
                .populate()
                .exec();

            return users.map(u => ({
                _id: u._id.toString(),
                name: u.name,
                email: u.email,
                password: u.password,
                posts: u.posts,
            }));
        }
    },
}
