const mongoose = require("mongoose");

// Define the schema for the order details
const OrderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    cartData: {
        subtotal: {
            type: Number,
            required: true
        },
        cartDetails: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            title: String,
            price: Number,
            color: String,
            images: String,
            quantity: Number
        }]
    }
});

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 8
        }
    }],
    total_items: {
        type: Number,
        default: 0
    },
    total_products: {
        type: Number,
        default: 0
    },
    order: [OrderSchema] // Embed the order schema here
});

module.exports = mongoose.model("User", UserSchema);
