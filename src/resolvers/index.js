import {  GraphQLDateTime} from 'graphql-iso-date'

const customScalarResolver = {
    Date: GraphQLDateTime
}

const userResolver = require('./user')
const messageResolver = require('./message')

export default [ customScalarResolver, userResolver, messageResolver ]