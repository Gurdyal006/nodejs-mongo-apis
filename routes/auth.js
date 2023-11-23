const express = require("express");
const {
  auth,
  register,
  logout,
  deleteUser,
  getAllUsers,
  getUserById,
  getMe,
} = require("../controllers/auth");
const { checkAuth, isAuthenticated } = require("../utils/features");

const router = express.Router();

//Routes
router.route("/login").post(auth);

router.route("/register").post(register);

router.route("/logout").get(logout);

router.route("/getAllUsers").get(getAllUsers);

router.route("/getUserById/:id").get(getUserById);

router.route("/deleteUser/:id").delete(deleteUser);

router.route("/getMe").get(getMe);


module.exports = router;
