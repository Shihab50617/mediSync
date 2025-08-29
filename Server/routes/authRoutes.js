const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); 
const User = require("../models/userModel"); 


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const admin = await Admin.findOne({ username });

   
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Invalid admin username or password" });
    }

   
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
      
      const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);

      return res.status(200).json({ authenticated: true, token });
    } else {
      return res
        .status(401)
        .json({ error: "Invalid admin username or password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;

  
    const user = await User.findOne({ username });

    
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid user username or password" });
    }

  
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

      return res.status(200).json({ authenticated: true, token });
    } else {
      return res
        .status(401)
        .json({ error: "Invalid user username or password" });
    }
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
