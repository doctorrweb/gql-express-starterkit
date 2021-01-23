import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connectMongo, models } from './src/model'

require('dotenv').config()

import typeDefs from './src/schema'
import resolvers from './src/resolvers'
import { getMe } from './src/utils'


const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: async ({ req, connection }) => {
    const me = await getMe(req)
    return {
      models,
      me,
      secret: process.env.SECRET
    }
  }
})

const app = express()
server.applyMiddleware({ app })

connectMongo()
  .then(() => {
    console.log('🚀 connected to mongoDB')
    app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
  })
  .catch(err => console.error(err))