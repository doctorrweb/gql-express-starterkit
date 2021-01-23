

export default {
    Query: {
        messages: async (parent, args, {models}) => {
            return await models.Message.find()
        },
        message: async (parent, {id}, {models}) => {
            return await models.Message.findById(id)
        }
    },
    Mutation: {
        createMessage: async (parent, { text }, {models, me}) => {
            const message = await models.Message.create({
                text,
                user: me.id
            })
            return message
        },
        deleteMessage: async (parent, {id}, {models}) => {
            const message = await models.Message.findById(id)
                if(message) {
                    await message.remove()
                    return true
                } else {
                    return false
                }
        }
    }
}