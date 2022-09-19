const express = require('express');
const router = express.Router();
const collegeController  = require('../controller/collegeController');
//const { createIntern } = require('../controller/internController');
const internController = require('../controller/internController')

// ----------------------------------internProject----------------------------------------//

//------------------------------------Postapi------------------------------------------//
// --------create collegeapi----------------//
router.post('/functionup/colleges',  collegeController.createCollege )

//---------------create collegeIntern----------------//
router.post('/functionup/interns', internController.createIntern)

//----------------------getDetails---------------------------//
router.get('/functionup/collegeDetails',collegeController.getDetails)

module.exports = router