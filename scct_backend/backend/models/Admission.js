const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'] 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'] 
    },
    phone: { 
        type: String, 
        required: [true, 'Phone number is required'] 
    },
    dob: { 
        type: String, 
        required: [true, 'Date of birth is required'] 
    },
    course: { 
        type: String, 
        required: [true, 'Course selection is required'] 
    },
    education: { 
        type: String, 
        required: [true, 'Previous education is required'] 
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'] 
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Admission', admissionSchema);