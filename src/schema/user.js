import { gql } from 'apollo-server-express'

export default gql `

    type Token {
        token: String!
    }

    type User {
        id: Int!
        username: String!
        email: String!
        role: String
        messages: [Message!]
    }
    
    extend type Query {
        users: [User!]
        user(id: ID!): User
        me: User
    }
    
    extend type Mutation {
        signUp(username: String!, email: String!, password: String!): User!
        signIn(username: String!, password: String!): Token!
        updateUser(username: String!): User!
        deleteUser(id: ID!): Boolean!
    }
    
`
    // # extend type Subscription {}

// module.exports = typeDefs
