const List = require("../models/List");
const Users = require("../models/Users")
const { filterAndSortProducts } = require("../services/FilterandSortProducts");
const { getUserCart } = require("../services/getUserCart");
const { fetchTaskAnalytics } = require("../services/TaskAnalyticsService");



const FetchUserData = async (req,res) =>{
  try {
    const { filters, sortCriteria,search } = req.query;
    console.log(req.query)
    // Call the service function to filter and sort products
    const products = await filterAndSortProducts(filters, sortCriteria,search);
   
    res.status(200).json({ 
      Message:"Product Fetched!",
      Payload:products });
} catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json( {Error:error.message});
}
}
const FetchFilteredData = async (req, res) => {
  try {
    const { filters, sortCriteria, search } = req.body;
    console.log("Request Body:", req.body);

    // Call the service function to filter and sort products
    const products = await filterAndSortProducts(filters, sortCriteria, search);

    res.status(200).json({ 
      Message: "Product Fetched!",
      Payload: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ Error: error.message });
  }
}


const ProductSearch = async (req, res) => {
  let payload = req.body.payload.trim();
  console.log(payload)
  try {
    const search = await List.find({productname:{$regex : new RegExp('^'+payload+'.*','i')}}).exec();
    
    const colors = search.map(item => item.productname);
    console.log(colors);
    res.status(200).json({ payload: search });
  } catch (error) {
    console.error('Error fetching task analytics:', error);
    res.status(500).json({ Error: error.message });
  }
};

const ProductDetails = async(req,res)=>{
  try {
    const productID = req.params.productID;
    const product = await List.findById(productID);
    console.log(req.params)
    
    if (!product) {
      return res.status(404).json({ Error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching shared task:", error);
    res.status(500).json({ Error: error.message });
  }
}
const UserCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ Error: 'User not authenticated' });
    }
    const user = req.user;
      // Get user cart details from the service
      const cartDetails = await getUserCart(user);
      res.status(200).json({Payload:cartDetails});
  } catch (error) {
      console.error("Error in getUserCart:", error);
      res.status(500).json({ error: error.message});
  }
};
const FetchOrder = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orders = user.order; // Assuming 'order' is the array containing orders

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {FetchUserData,ProductSearch,ProductDetails,FetchFilteredData,UserCart,FetchOrder}