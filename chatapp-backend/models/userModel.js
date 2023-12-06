const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema for the User model.
 * Includes fields for username, email, password, online status, and messages.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    online: {
        type: Boolean,
        default: false
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

/**
 * Pre-save hook to hash the password if it is modified.
 */
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

/**
 * Method to check the validity of a password.
 * @param {String} password - The password to check.
 * @returns {Boolean} - True if the password matches, false otherwise.
 */
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
