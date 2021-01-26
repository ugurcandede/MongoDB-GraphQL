const UserModel = require("../../../db_models/UserModel");

module.exports = {
    Post: {
        author: async ({ author }, args, context, info) => {
            return await UserModel.findById(author);
        },
    }
}
