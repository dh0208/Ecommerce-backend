import { Product } from '../models';
import { Cart } from '../models';

export const createProduct = async (productData) => {
    return await Product.create(productData);
};

export const getProductById = async (productId) => {
    return await Product.findByPk(productId);
};

export const updateProduct = async (productId, productData) => {
    const product = await Product.findByPk(productId);
    if (product) {
        return await product.update(productData);
    }
    return null;
};

export const deleteProduct = async (productId) => {
    const product = await Product.findByPk(productId);
    if (product) {
        await product.destroy();
        return true;
    }
    return false;
};

export const getAllProducts = async () => {
    return await Product.findAll();
};

export const addToCart = async (cartData) => {
    return await Cart.create(cartData);
};

export const getCartItems = async (userId) => {
    return await Cart.findAll({ where: { userId } });
};

export const removeFromCart = async (cartItemId) => {
    const cartItem = await Cart.findByPk(cartItemId);
    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
};