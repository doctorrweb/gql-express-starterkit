import { gql } from 'apollo-server-express'
import userSchema from './user'
import messageSchema from './message'


const baseSchema = gql `

scalar Date

type Query {
    _: Boolean
}

type Mutation {
    _: Boolean
}

type Subscription {
    _: Boolean
}

`

export default [ baseSchema, userSchema, messageSchema ]