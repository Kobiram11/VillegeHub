const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Member Schema
const memberSchema = new Schema({
    memberId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    educationalLevel: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    NIC: String, // Not required
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    votingEligibility: {
        type: String,
        enum: ['Eligible', 'Not Eligible'],
        default: 'Not Eligible',  // Set default value
        // not required
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    remarks: String,
    netIncome: Number, // Only for parents, so not required
    job: String, // Only for parents, so not required
    schoolName: String, // Only for children, so not required
    age: {
        type: Number,
        default: function() {
            const today = new Date();
            const birthDate = new Date(this.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    }
});

// Family Schema
const familySchema = new Schema({
    familyRef: {
        type: String,
        required: true
    },
    noOfMembers: {
        type: Number,
        required: true
    },
    headOfHouseholdName: {
        type: String,
        required: true
    },
    headOfHouseholdNIC: {
        type: String,
        required: true
    },
    headOfHouseholdContact: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    headOfHouseholdEmail: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    headOfHouseholdRemarks: String,
    members: [memberSchema] // Embedded array of members within the family
});

// House Schema
const houseSchema = new Schema({
    villageID: {
        type: String,
        required: true
    },
    houseNumber: {
        type: String,
        required: true,
        unique: true 
    },
    address: {
        type: String,
        required: true
    },
    landsize: {
        type: Number,
        required: true
    },
    landmarks: {
        type: String,
        required: true
    },
    remarks: String,
    
    noOfFamilies: {
        type: Number,
        required: true
    },
    landlineTelephone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerContact: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    ownerEmail: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    families: [familySchema], // Embedded array of families within the house
    lastVisited: {
        type: Date,
        default: null // Default to null if not yet visited
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
});

const House = mongoose.model('House', houseSchema);

module.exports = House;