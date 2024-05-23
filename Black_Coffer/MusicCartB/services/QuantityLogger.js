const User = require('../models/Users');

async function QuantityLoggerService(user, product_id, quantity) {
    try {
        const existingItem = user.cart.find(item => item.product_id.toString() === product_id.toString());

        if (existingItem) {
            // If the quantity exceeds 8, create a new duplicate product entry
            if (existingItem.quantity + quantity > 8) {
                const remainingQuantity = 8 - existingItem.quantity;
                existingItem.quantity = 8; // Set the quantity of the existing item to 8
                const remainingQuantityToAdd = quantity - remainingQuantity;
                
                // Add new duplicate product entries
                for (let i = 0; i < Math.ceil(remainingQuantityToAdd / 8); i++) {
                    user.cart.push({ product_id, quantity: Math.min(8, remainingQuantityToAdd) });
                    remainingQuantityToAdd -= 8;
                }
            } else {
                // Update the quantity of the existing item
                existingItem.quantity += quantity;
            }
        } else {
            // If the product doesn't exist in the cart, add it
            user.cart.push({ product_id, quantity });
        }

        // Calculate total_items based on the quantities in the cart
        user.total_items = user.cart.reduce((total, item) => total + item.quantity, 0);

        // Calculate total_products based on the unique products in the cart
        user.total_products = user.cart.length;

        await user.save();
        return user;
    } catch (error) {
        throw new Error('Could not add item to cart: ' + error.message);
    }
}

module.exports = {
    QuantityLoggerService
};
