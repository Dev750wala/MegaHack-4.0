// 1.> GET /patient/newpatient          => to render the new patient page.
// 2.> POST /patient/newpatient         => to create new patient.
// 3.> GET /patient/:patientId          => to show patient data.
// 4.> POST /patient/createRecord       => to create new record.

const express = require("express");
const router = express.Router();
const { handleShowNewPatientPage, handleDescribePatient, handleCreateNewPatient, handleCreateNewRecord } = require("../controllers/patient");
const { requireAuth } = require("../middlewares/user");

router
    .get("/newpatient", requireAuth, handleShowNewPatientPage)

    .post("/newPatient", requireAuth, handleCreateNewPatient)

    .get("/:patientId",requireAuth, handleDescribePatient)

    .post("/createRecord", requireAuth, handleCreateNewRecord);

module.exports = router;
