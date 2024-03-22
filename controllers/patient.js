const mongoose = require("mongoose");
const PATIENT =require("../models/patient")


function handleShowNewPatientPage (req, res) {
    res.render("newPatient");
    console.log("You are at new patient form page.");
}

async function handleDescribePatient (req, res) {
    const patientId = req.params.patientId;

    const patient = await PATIENT.find({
        patientId: patientId,
    });

    if (patient) {
        res.json({
            patient: patient,
        });
    } else {
        res.json({
            error: "patient not found"
        });
    }
}

async function handleCreateNewPatient (req, res) {
    const { fullName, patientId, email, dateOfBirth, gender, contact_no, deseases } = req.body;

    try {
        const newPatient = await new Hackathon({
            fullName: fullName,
            patientId: patientId,
            email: email,
            dateOfBirth: dateOfBirth,
            gender: gender,
            contact_no: contact_no,
            deseases: deseases,
            patientOf: req.user,
        });
        res.json({
            patient: newPatient,
        });
    } catch (error) {
        console.log(error);
    }
    // console.log("you are seeing the description of the hackathon");
}

async function handleCreateNewRecord (req, res) {
    
}

module.exports = {
    handleShowNewPatientPage,
    handleDescribePatient,
    handleCreateNewPatient,
    handleCreateNewRecord
}