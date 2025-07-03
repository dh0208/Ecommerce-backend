const { Product, Category } = require('../models');

async function findOrCreateCategory(categoryName) {
  let category = await Category.findOne({ where: { name: categoryName } });
  if (!category) {
    category = await Category.create({ name: categoryName });
  }
  return category;
}

module.exports = {
  async createProduct(data) {
    // If category is provided as a name, find or create it
    let categoryId = data.categoryId;
    if (!categoryId && data.category) {
      const category = await findOrCreateCategory(data.category);
      categoryId = category.id;
    }
    // If categoryId is provided, ensure it exists
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new Error('Category does not exist');
      }
    }
    return await Product.create({ ...data, categoryId });
  },
  async getAllProducts() {

    return await Product.findAll();
  },
  async getProductById(id) {
    return await Product.findByPk(id);
  },
  async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(data);
  },
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
  }
};