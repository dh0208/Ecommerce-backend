const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_image: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: true,
});

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: true,
});

const Cart = sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});

const User = require('./User');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from authenticated user
        const { items, shippingAddress } = req.body;

        // Create the order
        const order = await Order.create({
            userId,
            shippingAddress: JSON.stringify(shippingAddress),
            // ...other order fields...
        });

        // Create order items
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                // ...other fields if needed...
            });
        }

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sequelize,
    Product,
    Category,
    Cart,
    User,
    Order,
    OrderItem,
};