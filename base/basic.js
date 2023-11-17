const express = require("express")
const router = express.Router();


const fs = require('fs');
const dataroute = require('./details.js')

router.use(dataroute)
module.exports = router;