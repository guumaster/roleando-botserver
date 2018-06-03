const express = require('express')
const nodeStats = require('node-stats-lite')

const router = express.Router()
router.use(nodeStats)
module.exports = router
