// userController.js
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new user (Register)
exports.createUser = async (req, res) => {
  try {
    // Generate unique ID
    const uniqueId = uuidv4();

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user object
    const user = new User({
      id: uniqueId,
      ...req.body,
      password: hashedPassword, // save hashed password
    });

    // Save in MongoDB
    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    // If password is updated, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login successful", authenticated: true, token });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
