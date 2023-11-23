const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");
const express = require("express");

exports.generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

exports.cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;

    if (!cookie) return null;

    const token = cookie.split("=")[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.checkAuth = async (req, res) => {
  const cookie = req.headers.cookie;
  console.log(cookie);

  if (!cookie) return null;

  const token = cookie.split("=")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
};
