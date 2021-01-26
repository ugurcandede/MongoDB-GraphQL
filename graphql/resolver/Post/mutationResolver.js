const PostModel = require("../../../db_models/PostModel")
const UserModel = require("../../../db_models/UserModel")
const { pubsub } = require("../../PubSubHelper")
const { transformPost } = require('../merger')

module.exports = {
    RootMutation: {
        createPost: async (parent, { post }, contex, info) => {
            const newPost = await new PostModel({
                title: post.title,
                body: post.body,
                published: post.published,
                author: post.author,
                date: post.date
            })
            let createdPost;
            try {
                const result = await new Promise((resolve, reject) => {
                    newPost.save((err, res) => {
                        pubsub.publish('Post', { post: res });
                        err ? reject(err) : resolve(res);
                    });
                });
                createdPost = transformPost(result);
                const creator = await UserModel.findById(post.author);

                if (!creator) {
                    throw new Error("Kullanıcı Bulunamadı...");
                }

                creator.posts.push(newPost);
                await creator.save();

                return createdPost;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    }
}