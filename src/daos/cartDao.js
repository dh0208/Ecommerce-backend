const { Cart, Product } = require('../models');

module.exports = {
  async getCart(userId) {
    return await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: 'product' }]
    });
  },
  async removeCartItem(userId, productId) {
    return await Cart.destroy({ where: { userId, productId } });
  },
  async updateCartItem(userId, productId, quantity) {
    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) throw new Error('Cart item not found');
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  }
};