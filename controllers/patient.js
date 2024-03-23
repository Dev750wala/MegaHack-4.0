const mongoose = require("mongoose");
const PATIENT =require("../models/patient")
const { spawn } = require('child_process');
const path = require('path');

function handleShowNewPatientPage (req, res) {
    res.render("newPatient");
    // console.log("You are at new patient form page.");
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
    const { fullName, email, dateOfBirth, gender, contact_no, deseases } = req.body;

    try {
        const newPatient = await new PATIENT({
            fullName: fullName,
            // patientId: patientId,
            email: email,
            dateOfBirth: dateOfBirth,
            gender: gender,
            contact_no: contact_no,
            deseases: deseases,
            patientOf: req.user._id,
        });
        res.json({
            patient: newPatient,
        });
    } catch (error) {
        console.log(error);
    }
    // console.log("you are seeing the description of the hackathon");
}

async function handleCreateNewRecord(req, res) {
    const pythonScript = path.join(__dirname, 'scanner.py');
    const imagePath = path.join(__dirname, 'demo.png');

    const pythonProcess = spawn('python', [pythonScript, imagePath]);
    let outputData = '';

    pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script stderr: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script process exited with code ${code}`);
        if (code === 0) {
            console.log('Process completed successfully');
            res.json({ success: true, data: outputData });
        } else {
            console.error('Process failed');
            res.status(500).json({ success: false, error: 'Process failed' });
        }
    });
}



module.exports = {
    handleShowNewPatientPage,
    handleDescribePatient,
    handleCreateNewPatient,
    handleCreateNewRecord
}