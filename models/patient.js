const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
    contact_no: {
        type: String,
    },
    diseases: {
        type: String
    },
    patientOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    history: [
        {
            visitedDate: {
                type: String,
                // const date = new Date(1710834120613);
                // const humanDate = date.toLocaleString();
                // OUTPUT: '19/3/2024, 1:12:00 pm'
                default: Date.now(),
                required: true,
            },
            symptoms: {
                type: String,
                required: true,
            },
            prescriptions: {
                type: String,
                required: true,
            }
        },
    ],
});

patientSchema.pre("save", async function(next) {
    this.patientId = Math.floor(Math.random()*1000000);
    next();
})

const USER = mongoose.model('user', userSchema);

module.exports = USER;