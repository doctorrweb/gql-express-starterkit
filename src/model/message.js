import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

const Message = model('Message', messageSchema)

export default Message