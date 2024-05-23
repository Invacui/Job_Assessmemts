const express = require("express");
const data = express.Router();
const IsLoggedIn = require("../middleware/IsLoggedIn");

const {
    FetchUserData,
    FetchFilteredData,
    ProductDetails,
    UserCart,
    ProductSearch,
    FetchOrder,
} = require("../controller/Data.js")

data.get('/fetch_products', FetchUserData); //home_page
data.post('/filtered_products', FetchFilteredData); //home_page
data.get('/product/:productID', ProductDetails);
data.post('/searchData', ProductSearch);
data.get('/usercart',IsLoggedIn, UserCart);
data.get('/orders',IsLoggedIn, FetchOrder);

module.exports = data; 