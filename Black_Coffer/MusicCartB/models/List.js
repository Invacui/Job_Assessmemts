const mongoose = require("mongoose");


const ListSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      color: {
        type: String
      },
      brand: {
        type: String
      },
      description: {
        type: [String],
        required: true
      },
      category: {
        type: String,
        required: true
      },
      images: [{
        type: String,
        required: true
      }],
      rating: {
        rate: {
          type: Number,
          default: 0
        },
        count: {
          type: Number,
          default: 0
        }
      },
      quantity: {
        type: Number,
        required: true
      }  
  });
  module.exports = mongoose.model('List', ListSchema);
  