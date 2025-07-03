const ProductService = require('../services/productService');
const { OK, CREATED, NOT_FOUND, BAD_REQUEST } = require('../utils/statusCodes');

module.exports = {
  async createProduct(req, res, next) {
    try {

      const product = await ProductService.createProduct(req.body);
      return res.status(CREATED).json(product);
    } catch (error) {
      next(error);
    }
  },

  async getAllProducts(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(OK).json(products);
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) return res.status(NOT_FOUND).json({ message: 'Product not found' });
      return res.status(OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      if (!product) return res.status(NOT_FOUND).json({ message: 'Product not found' });
      return res.status(OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const deleted = await ProductService.deleteProduct(req.params.id);
      if (!deleted) return res.status(NOT_FOUND).json({ message: 'Product not found' });
      return res.status(OK).json({ message: 'Product deleted' });
    } catch (error) {
      next(error);
    }
  }
};