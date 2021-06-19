const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},//In make one call only
    password: {type: String, required: true, unique: true}
    },
    {collection: 'users'}
)

const model = mongoose.model('UserSchema',UserSchema)

module.exports = model