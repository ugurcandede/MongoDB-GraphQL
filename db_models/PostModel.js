const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function () {
    return this.toString();
};

const PostSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    published: {
        type: Boolean,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    date: {
        published: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date,
            default: Date.now()
        }
    }
})

module.exports = mongoose.model("PostModel", PostSchema)