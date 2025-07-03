const { Order, OrderItem } = require('../models');

module.exports = {
  async createOrder(data) {
    // Create the order
    const order = await Order.create({
      firstName: data.shippingAddress.firstName,
      lastName: data.shippingAddress.lastName,
      email: data.shippingAddress.email,
      phone: data.shippingAddress.phone,
      streetAddress: data.shippingAddress.address,
      city: data.shippingAddress.city,
      state: data.shippingAddress.state,
      zip: data.shippingAddress.zipCode,
      userId: data.shippingAddress.userId // Assuming userId is passed in the payload
    });

    // Create order items
    for (const item of data.items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        categoryId: item.categoryId,
        price: item.price, // Make sure your frontend sends price
        quantity: item.quantity
      });
    }
    return order;
  }
};