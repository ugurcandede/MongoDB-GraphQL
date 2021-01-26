const PostModel = require("../../../db_models/PostModel")

module.exports = {
    RootQuery: {
        post: async (parent, { _id }, contex, info) => {
            return await PostModel
                .findOne({ _id })
                .exec()
        },
        posts: async (parent, args, contex, info) => {
            const res = await PostModel
                .find({})
                .populate()
                .exec()
            return res.map(u => ({
                _id: u._id.toString(),
                title: u.title,
                body: u.body,
                published: u.published,
                author: u.author,
                date: u.date
            }))
        }
    }
}