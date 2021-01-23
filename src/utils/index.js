import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { verify, sign } from 'jsonwebtoken'
import { skip, combineResolvers } from 'graphql-resolvers'

require('dotenv').config()

export const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user
    return sign({ id, email, username, role }, secret, {
        expiresIn
    })
}

export const getMe = async (req) => {
    const token = req.headers['x-token']

    if(token) {
        try {
            return verify(token, process.env.SECRET)
        } catch (error) {
            throw new AuthenticationError('Your Session expired. Please sign again')
        }
    }
}

export const isAuthenticated = (parent, args, {me}) => {
    if (me) return skip
    return new ForbiddenError('User is not authenticated')
}


export const isAdmin = combineResolvers (
    // Remove the "This" if it's doesn't work
    isAuthenticated,
    (parent, args, {me: {role}}) => {
        return role === 'admin' ? skip : new ForbiddenError('User is not authorized to acces this resource')
    }
)