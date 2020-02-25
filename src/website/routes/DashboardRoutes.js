const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

/* DASHBOARD */
router.get('/dashboard/pannel', dashboardController.renderPannel);
router.get('/dashboard/register', dashboardController.renderRegister);
router.post('/dashboard/webhook', dashboardController.webhook);

module.exports = router;
