const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const doctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: Date,
        required: true,
    },
})

doctorSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); 
    }
})

doctorSchema.statics.login = async function (input, usernameOrEmail, password) {
    let doctor;

    if(input === "email") {
        doctor = await this.findOne({email: usernameOrEmail});
    } else if(input === "username") {
        doctor = await this.findOne({username: usernameOrEmail});
    }
    
    if(doctor) {
        const auth = await bcrypt.compare(password, doctor.password);
        if (auth) return doctor;
        throw Error("Incorrect password");
    }
    throw Error("User not found");
}

const doctorModel = mongoose.model('doctor', doctorSchema);

module.exports = doctorModel;