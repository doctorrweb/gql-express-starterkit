import mongoose from 'mongoose'
import User from './user'
import Message from './message'

export const connectMongo = () => {
    return mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
}

export const models = { User, Message }
