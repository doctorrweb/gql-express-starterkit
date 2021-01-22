import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail'


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [isEmail, 'No valid email provided']
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 42
    },
    role: {
        type: String
    }
})


userSchema.static.findByUsername = async (username) => {
    let user = await this.findOne({ username })
    return user
}

userSchema.pre('remove', function (next) {
    this.model('Message').deleteMany({ userId: this._id }, next)
})

userSchema.pre('save', async function () {
    this.password = await this.generatePasswordHash()
})

userSchema.methods.generatePasswordHash = async function () {
    const saltRopunds = 10
    return await bcrypt.hash(this.password, saltRopunds)
}

const User = model('User', userSchema)

export default User