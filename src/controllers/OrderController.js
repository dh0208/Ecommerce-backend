const OrderService = require('../services/orderService');
const { CREATED, OK, BAD_REQUEST } = require('../utils/statusCodes');

module.exports = {
  async placeOrder(req, res, next) {
    try {
      const order = await OrderService.createOrder(req.body, req.user.id); // Pass userId from auth
      return res.status(CREATED).json(order);
    } catch (error) {
      next(error);
    }
  }
};