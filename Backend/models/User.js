const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Ensure no leading/trailing whitespace in usernames
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Example: Minimum length requirement
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
