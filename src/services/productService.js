const ProductDAO = require('../daos/productDao');

module.exports = {
  async createProduct(data) {
    if (!data.name || !data.price || !data.categoryId) throw new Error('Missing required fields');
    return await ProductDAO.createProduct(data);
  },
  async getAllProducts() {
    return await ProductDAO.getAllProducts();
  },
  async getProductById(id) {
    return await ProductDAO.getProductById(id);
  },
  async updateProduct(id, data) {
    return await ProductDAO.updateProduct(id, data);
  },
  async deleteProduct(id) {
    return await ProductDAO.deleteProduct(id);
  }
};