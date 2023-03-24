const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ViewSchema = new Schema (
    {
        viewId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        viewText: {
            type: String,
            required: [true, 'Please tell us your view on this article'],
            maxLength: [280, 'Please keep your message under 280 characters']
        },
        username: {
            type: String,
            required: [true, 'Please enter your username when entering your comment']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }  
    },
    {
        toJSON: {
            getters: true
        }
    }
);

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
        },
        views: [ViewSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

DescriptionSchema.virtual('viewCount').get(function() {
    return this.vieww.length
});

const Description = model('Description', DescriptionSchema);

module.exports = Description;

