const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/get-product-list',authMiddleware, ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/create-product', authMiddleware, ProductController.createProduct);
router.put('/:id', authMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;