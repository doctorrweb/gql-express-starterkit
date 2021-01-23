import {  GraphQLDateTime} from 'graphql-iso-date'
import { combineResolvers } from 'graphql-resolvers'

const customScalarResolver = {
    Date: GraphQLDateTime
}

const userResolver = require('./user')
const messageResolver = require('./message')

export default combineResolvers(customScalarResolver, userResolver, messageResolver)
