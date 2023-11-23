const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  generateToken,
  cookieSetter,
  isAuthenticated,
  checkAuth,
} = require("../utils/features");
const { errorHandler, asyncError } = require("../middlewares/error");

// User login
exports.auth = asyncError(async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) return errorHandler(res, 400, "User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      role: user.roles,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create User
exports.register = asyncError(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = generateToken(user);

    cookieSetter(res, token, true);

    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      avatar: {
        public_id: "demoId",
        url: "demoUrl",
      },
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all user
exports.getAllUsers = asyncError(async (req, res) => {
  try {
    const getAllUsers = await User.find();

    const userCount = await User.find().count();

    res.status(200).json({
      success: true,
      userCount,
      getAllUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// user delete
exports.deleteUser = asyncError(async (req, res) => {
  try {
    const userId = await User.findById(req.params.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found!!",
      });
    }

    await User.deleteOne();

    return res.status(201).json({
      success: true,
      message: "Delete Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// get data by id
exports.getUserById = asyncError(async (req, res) => {
  const userId = req.params.id?.match(/^[0-9a-fA-F]{24}$/);

  try {
    const data = await User.findById(userId);

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "data not found!!",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Logout
exports.logout = asyncError(async (req, res) => {
  cookieSetter(res, null, false);

  res.status(200).json({
    success: true,
    message: "LoggedOut Successfully",
  });
});

// get me
exports.getMe = async (req, res, next) => {
  const user = await checkAuth(req);

  // console.log("user----", user);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Please login first!!!",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
};
