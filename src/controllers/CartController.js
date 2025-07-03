const cartService = require('../services/cartService');
const { Cart, Product } = require('../models');

module.exports = {
  // Display all items in the cart for a user
  async getCart(req, res, next) {
    try {
      const userId = req.user.id; // assuming authMiddleware sets req.user
      const cart = await cartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  // Remove an item from the cart
  async removeCartItem(req, res, next) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const response = await cartService.removeCartItem(userId, productId);
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      next(error);
    }
  },

  // Update quantity of an item in the cart
  async updateCartItem(req, res, next) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { quantity } = req.body;
      if (quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1' });
      const updated = await cartService.updateCartItem(userId, productId, quantity);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  },

  // Add an item to the cart or update quantity if it already exists
  async addToCart(req, res) {
    try {
      const userId = req.user.id; // assuming authMiddleware sets req.user
      const { productId, quantity } = req.body;


      // Check if product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Check if item already in cart
      let cartItem = await Cart.findOne({ where: { userId, productId } });
      if (cartItem) {
        // Update quantity if already in cart
        cartItem.quantity += quantity || 1;
        await cartItem.save();
      } else {
        // Add new item to cart
        cartItem = await Cart.create({
          userId,
          productId,
          quantity: quantity || 1
        });
      }

      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};