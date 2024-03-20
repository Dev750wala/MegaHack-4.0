// 1.> GET /patient/newpatient          => to render the new patient page.
// 2.> POST /patient/newpatient         => to create new patient.
// 2.> GET /patient/:patientId          => to to show patient data.

const express = require("express");
const router = express.Router();
const { handleShowAllHackathons, handleDescribeHackathon, handleCreateHackathon } = require("../controllers/patient");
const { requireAuth } = require("../middlewares/user");

router
    .get("/newpatient", requireAuth, handleCreateHackathon)

    .post("/newPatient", handleShowAllHackathons)

    .get("/:patientId", handleDescribeHackathon);


module.exports = router;