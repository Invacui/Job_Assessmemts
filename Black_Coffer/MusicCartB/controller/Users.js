//controller
const Users = require("../models/Users")
const List = require("../models/List")
const Feedback = require("../models/Feedback")
const bcrypt = require("bcrypt");
const env = require("dotenv");
const jwttoken = require("jsonwebtoken");
//ENV
env.config({path:'../Private.env'});

//SERVICES DEFINITION
const {
    UserLoginService,
} = require("../services/UserTable");
const { fetchTasksByTimeDuration } = require("../services/FetchUserTabs");
const { QuantityLoggerService } = require("../services/QuantityLogger");

//SIGNUP HANDLER
const 

UserSignup = async (req, res) => {
    const { name,phone,email, password } = req.body;
    console.log(req.body)
  if (!name ||!phone|| !email || !password) {
    return res.status(400).json({
      Message: "Please fill out the form correctly. All fields are required.",
    });
  } 
  //Bcrypt
  const hashed_password = await bcrypt.hash(password, 10);
  try {
    const existingUser = await Users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      throw new Error("User with this email/phone already exists.");
    } else {
      const newUser = new Users({ name, phone,email, password:hashed_password });
      await newUser.save();
       res.status(200).json({
        Message: "User created successfully"
      });
    }
  } catch (error) {
    res.status(400).json({
      Message: `Error! Cannot Login. Error Message: ${error.message}`, //This Message is very Important because the typo can cause headache in toastify
    });
  }
};

//LOGIN HANDLER
const UserLogin = async (req, res) => {
  const PRIVATE_TOKEN_KEY = process.env.PRIVATE_TOKEN_KEY;
  const { email, phone, password } = req.body;
  console.log(req.body); // Debug log to see the request body

  if ((!email && !phone) || !password) {
      return res.status(400).json({
          Message: 'Please provide either email or phone and password.',
      });
  }

  try {
      let validateUser;

      if (phone) {
          console.log("Logging in with phone:", phone); // Debug log
          validateUser = await UserLoginService(phone, password, 'phone');
      } else {
          console.log("Logging in with email:", email); // Debug log
          validateUser = await UserLoginService(email, password, 'email');
      }

      console.log("Validated user:", validateUser); // Debug log

      if (validateUser) {
          const userData = {
              userId: validateUser._id,
              name: validateUser.name,
              email: validateUser.email,
              cart: validateUser.cart,
              orders: validateUser.order // Return only data object that is needed
          };

          const tokendata = {
              _id: validateUser._id,
              name: validateUser.name,
              phone: validateUser.phone,
              email: validateUser.email,
          };

          const jwttokengen = jwttoken.sign(tokendata, PRIVATE_TOKEN_KEY, { expiresIn: 2000 });

          return res.status(200).json({
              Message: 'Login Successful',
              jwttokengen,
              userData
          });
      } else {
          return res.status(400).json({
              Message: 'Invalid email/phone or password.',
          });
      }
  } catch (error) {
      return res.status(400).json({
          Message: `Error! Cannot Login. Error Message: ${error.message}`
      });
  }
};

//QuantityLogger
async function QuantityLogger(req, res) {
    const userId  = req.user;
    const { product_id, quantity } = req.body;
    try {
        const user = await QuantityLoggerService(userId, product_id, quantity);
        res.status(201).json(user);
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
//FetchUser
async function FetchUser(req, res) {
  try {
      const user  = await req.user;
        if(user){
        res.status(201).json({Payload:user})
      };
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
//OrderPost Api
async function PostOrders(req, res) {
  try {
    const user = await req.user;

    const { address, paymentMethod, cartData } = req.body;

    // Prepare order object
    const order = {
      address,
      paymentMethod,
      cartData
    };

    user.order.push(order);
    await user.save();

    res.status(201).json({ msg: 'Order placed successfully', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
async function getOrders(req, res) {
  try {
    const user = await req.user.populate('order').execPopulate();

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user.order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}
async function postFeedback(req, res) {
  try {
    console.log("Got Git")
    const userId = req.user.id;
    const { type, feedbackText } = req.body;

    // Validate type
    if (!['bugs', 'feedback', 'query'].includes(type)) {
      return res.status(400).json({ msg: 'Invalid feedback type' });
    }

    // Find or create the feedback document
    let feedback = await Feedback.findOne();
    if (!feedback) {
      feedback = new Feedback();
    }

    // Push the new feedback to the corresponding array
    feedback[type].push({ userId, feedbackText });

    // Save the changes
    await feedback.save();

    res.status(201).json({ msg: 'Feedback added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}


module.exports = {UserSignup , UserLogin,QuantityLogger,FetchUser,PostOrders,getOrders,postFeedback};

