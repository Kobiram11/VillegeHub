const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    id: {
        required:true,
        type:String,
         unique: true,
        validate: {
            validator: function(v) {
                return /^NT\d{4}$/.test(v); // Must start with 'NT' followed by 4 digits
            },
            message: props => `${props.value} is not a valid ID!`
        }
    },
    noticeCategory: {
        required: true,
        type: String,
        enum: {
            values: ['Public Events', 'Public Services', 'Welfare', 'Election Information', 'Social Services', 'Other'],
            message: 'Notice category must be one of Public Events, Public Services, Welfare, Election Information, Social Services, or Other.'
        }
    },
    description: {
        required: true,
        type: String,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date 
    }
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
