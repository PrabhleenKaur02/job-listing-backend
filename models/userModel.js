const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// user schema
const UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },

    // email: {
    //     type: String,
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    //     required: true
    // },

    hash_password: {
        type: String,
        required: true
    },

    // created: {
    //     type: Date,
    //     default: Date.now
    // }

});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', UserSchema)
module.exports = User;