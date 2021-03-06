import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { skip, combineResolvers } from 'graphql-resolvers'
import { isAdmin, isAuthenticated, createToken } from '../utils'

export default {
    Query: {
        users: async (parent, args, {models}) => {
            return await models.User.find()
        },
        user: async (parent, {id}, {models}) => {
            return await models.User.findById(id)
        },
        me: async (parent, {id}, {models, me}) => {
            if (!me) return null
            return await models.User.findById(me.id)
        }
    },
    Mutation: {
        signUp: async (parent, {username, email, password}, {models, secret}) => {
            const user = await models.User.create({
                username, 
                email,
                password
            })
            return { token: createToken(user, secret, '30m') }
        },
        signIn: async (parent, {login, password}, {models, secret}) => {
            const user = await models.User.findByLogin(login)
            if(!user) throw new UserInputError('No user found with Login credentials')
            const isValid = await user.validatePassword(password)
            if(!isValid) throw new AuthenticationError('Invalid password')
            return { token: createToken(user, secret, '30m') }
        },
        updateUser: combineResolvers(
            isAdmin,
            async (parent, { username }, { models, me }) => {
                return await models.User.findByIdAndUpdate(
                    me.id,
                    { username },
                    { new: true }
                )
            }
        ),
        deleteUser: combineResolvers(
            isAdmin,
            async (parent, {id}, {models}) => {
                const user = await models.User.findById(id)
                if(user) {
                    await user.remove()
                    return true
                } else {
                    return false
                }
            }
        )
    }
}