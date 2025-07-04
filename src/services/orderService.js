const { Order, OrderItem, Product, Category } = require('../models');

module.exports = {
  async createOrder(data, userId) {
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
      userId // Use the userId from the controller, not from payload
    });

    // Create order items
    for (const item of data.items) {
      // Fetch product and category info
      const product = await Product.findByPk(item.productId);
      const category = await Category.findByPk(product.categoryId);
      console.log("product", product, "category", category);

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        categoryId: product.categoryId,
        categoryName: category.name,
        userId, // from controller
        price: product.price,
        quantity: item.quantity
      });
    }
    return order;
  }
};