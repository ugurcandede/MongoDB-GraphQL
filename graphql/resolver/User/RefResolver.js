const PostModel = require("../../../db_models/PostModel");

module.exports = {
    User: {
        posts: async ({ _id }, args, context, info) => {
            return await PostModel.find({ author: _id });
        },
    }
}
