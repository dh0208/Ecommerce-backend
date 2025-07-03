const { Order, Cart } = require('../models');

module.exports = {
  async createOrder(data) {
    // Example: create order and associate cart items
    const order = await Order.create({ customer: data.customer });
    for (const item of data.items) {
      await Cart.create({ ...item, orderId: order.id });
    }
    return order;
  }
};