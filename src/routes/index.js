const express = require('express');
const router = express.Router();


router.use('/products', require('./productRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/cart', require('./cartRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/categories', require('./categoryRoutes'));

module.exports = router;