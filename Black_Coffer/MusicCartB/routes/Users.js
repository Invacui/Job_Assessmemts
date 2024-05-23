//ROUTES
const express = require("express");
const auth = express.Router();
const IsLoggedIn = require('../middleware/IsLoggedIn')

const {
    UserSignup,
    UserLogin,
    QuantityLogger,
    FetchUser,
    PostOrders,
    getOrders,
    postFeedback,

}  = require("../controller/Users");

auth.post('/signup' , UserSignup); 
auth.post('/login' , UserLogin)
auth.post('/cartLogger',IsLoggedIn, QuantityLogger)
auth.get('/fetchuser',IsLoggedIn, FetchUser)
auth.post('/postorder',IsLoggedIn, PostOrders)
auth.get('/getOrders',IsLoggedIn, getOrders)
auth.post('/postFeedback',IsLoggedIn, postFeedback)


module.exports = auth;

            /*OR*/
            /*exports.auth = User */
            /*module.exports = auth; */