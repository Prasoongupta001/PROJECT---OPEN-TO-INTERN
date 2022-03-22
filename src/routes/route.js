const express = require('express');
const router = express.Router();

const CollegeController=require("../Controllers/CollegeController")
const InternController=require("../Controllers/InternController")





router.post("/colleges",CollegeController.CreateCollege)

 router.post("/CreateIntern",InternController.CreateIntern)
 router.get("/collegeDetails",CollegeController.GetDetails)



module.exports = router;