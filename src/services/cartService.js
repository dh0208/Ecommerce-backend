const cartDao = require('../daos/cartDao');

module.exports = {
  async getCart(userId) {
    return await cartDao.getCart(userId);
  },
  async removeCartItem(userId, productId) {
    return await cartDao.removeCartItem(userId, productId);
  },
  async updateCartItem(userId, productId, quantity) {
    return await cartDao.updateCartItem(userId, productId, quantity);
  }
};