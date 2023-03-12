const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Please enter a username to proceed'],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please enter a valid email'],
        },
        description: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Description'
            }
        ]
    }
);

const User = model('User', UserSchema);

module.exports = User;