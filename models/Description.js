const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DescriptionSchema = new Schema(
    {
        descriptionText: {
            type: String,
            required: [true, 'Please describe why you would be a good date'],
            minLength: [1, 'has to at least be one character long'],
            maxLength: [128, 'can not be more than 128 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: [true, 'Please enter your username']
        }
    }
);

const Description = model('Description', DescriptionSchema);

module.exports = Description;

