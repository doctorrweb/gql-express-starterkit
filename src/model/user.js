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
        required: [true, 'Please add an email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [7, 'Your password must have 7 characters minimum'],
        maxlength: [42, 'Your password must have 42 characters maximum'],
        select: false
    },
    role: {
        type: String,
        lowercase: true,
        enum: [
            'suscriber',
            'manager',
            'admin'
        ],
        required: true,
        default: 'suscriber'
    }
})


userSchema.static.findByUsername = async (username) => {
    let user = await this.findOne({ username })
    return user
}

// Compare Password
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.pre('remove', function (next) {
    this.model('Message').deleteMany({ userId: this._id }, next)
})


userSchema.pre('save', async function (next) {

    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// userSchema.pre('save', async function () {
//     this.password = await this.generatePasswordHash()
// })

// userSchema.methods.generatePasswordHash = async function () {
//     const saltRopunds = 10
//     return await bcrypt.hash(this.password, saltRopunds)
// }

const User = model('User', userSchema)

export default User