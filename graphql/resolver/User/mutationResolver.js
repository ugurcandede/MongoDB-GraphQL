const UserModel = require("../../../db_models/UserModel")
const { pubsub } = require("../../PubSubHelper")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env

async function generateToken(user) {
    return await jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
    },
        SECRET_KEY,
        { expiresIn: '1h' }
    )
}

module.exports = {
    RootMutation: {
        createUser: async (parent, { user }, context, info) => {
            const newUser = await new UserModel({
                name: user.name,
                email: user.email,
                password: await bcrypt.hash(user.password, 10),
            });

            const res = await newUser.save()
            console.log(res)

            const token = generateToken(res)
            console.log("CREATED TOKEN=> ", (await token).toString())

            pubsub.publish('User', { user: res });

            return {
                ...res._doc,
                id: res._id,
                token
            }

            // return new Promise((resolve, reject) => {
            //     newUser.save((err, res) => {
            //         pubsub.publish('User', { user: res });
            //         err ? reject(err) : resolve(res);
            //         token
            //     });
            // });
        },

        loginUser: async (parent, { email, password }, context, info) => {
            const user = await UserModel.findOne({ email })
            if (!user) {
                throw new Error("Kullanıcı Bulunamadı")
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                throw new Error("Yanlış kimlik bilgileri")
            }

            const token = generateToken(user)
            console.log(await token)
            return {
                ...user._doc,
                id: user._id,
                token
            };

        }
    },
}
