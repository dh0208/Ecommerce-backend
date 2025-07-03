const express = require('express');
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/place-order', authMiddleware, OrderController.placeOrder);

module.exports = router;