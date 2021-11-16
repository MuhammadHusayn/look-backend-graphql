import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import express from 'express'
import path from 'path'
import http from 'http'
import { typeDefs } from './modules/typeDefs.js'
import { resolvers } from './modules/resolvers.js'

const PORT = process.env.PORT || 4000

;(async () => {
    const app = express()

    app.use( express.static( path.join( process.cwd(), 'src', 'public' )  ) )

    app.get('/', (req, res) => res.sendFile( path.join( process.cwd(), 'src', 'views', 'index.html' ) ) )

    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    })
    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})()

