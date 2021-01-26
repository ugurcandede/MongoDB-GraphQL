require("dotenv").config()
const { GraphQLServer } = require("graphql-yoga")
const mongoose = require("mongoose")
const Animation = require("chalk-animation")

const { mongoURI, PORT } = process.env

const typeDefs = require('./graphql/types/RootTypes');
const resolvers = require('./graphQL/resolver/RootResolver');

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

const graphQLServerOptions = {
    port: PORT || 3310,
    endpoint: "/api",
    subscriptions: "/subscriptions",
    playground: "/",
    debug: false,
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        server.start(graphQLServerOptions, ({ port }) => {
            console.clear()
            Animation.rainbow(`\n\t🎡MongoDB bağlantısı kuruldu\n🚀GraphQL localhost:${port} üzerinde çalışıyor`, 3)
        })
            .catch(err => console.log("GraphQL Server Hatası", err))
    })
    .catch(err => {
        console.warn(`MongoDB ye bağlanırken hata oluştu\n`, err)
    })

