const List = require('../models/List');
const Users = require('../models/Users');

const getUserCart = async (user) => {
    try {
        console.log("GET user HIT")
        // Extract cart items from user object
        const cartItems = user.cart;

        // Prepare cart details array
        const cartDetails = [];
        let subtotal = 0;

        // Iterate over cart items and fetch product details
        for (const cartItem of cartItems) {
            // Fetch product details for each cart item
            const product = await List.findOne({ "_id": cartItem.product_id });
            console.log(cartItem.product_id)
            if (product) {
                // Calculate product_total for the current product
                const product_total = product.price * cartItem.quantity;

                // Add product_total to subtotal
                subtotal += product_total;

                // Add product details to cartDetails array
                cartDetails.push({
                    productId: product._id,
                    name: product.productname,
                    title: product.title,
                    price: product.price,
                    color: product.color,
                    images: product.images[0],
                    quantity: cartItem.quantity,
                    product_total // Add product_total to cartDetails
                });
            }
        }

        // Return cart details along with subtotal
        return {
            cartDetails,
            subtotal
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getUserCart
};
