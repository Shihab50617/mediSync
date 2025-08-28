const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

// Create a new user (Register)
exports.createUser = async (req, res) => {
  try {
    const uniqueId = uuidv4();

    // Create user object (password will be hashed by schema pre-save hook)
    const user = new User({
      id: uniqueId,
      ...req.body,
    });

    await user.save();
    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);

    // Handle duplicate key error (e.g., email already exists)
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: "Email or ID already exists" });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, error: err.message });
    }

    return res.status(500).json({ success: false, error: "Internal server error" });
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User updated successfully", user });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User Login

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    // Return user object (without password) to frontend
    const { password: pwd, ...userData } = user.toObject();

    return res.status(200).json({ success: true, user: userData, message: "Login successful" });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
