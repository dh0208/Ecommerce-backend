const express = require('express');
const CartController = require('../controllers/CartController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, CartController.getCart);
router.post('/add-to-cart', authMiddleware, CartController.addToCart);
router.delete('/:productId', authMiddleware, CartController.removeCartItem);
router.put('/:productId', authMiddleware, CartController.updateCartItem);

module.exports = router;