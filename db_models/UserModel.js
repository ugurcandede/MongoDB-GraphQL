const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function () {
    return this.toString();
};

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: 5,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "PostModel"
        }
    ],
})

module.exports = mongoose.model("UserModel", UserSchema)