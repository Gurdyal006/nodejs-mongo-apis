const express = require("express");
const { checkAuth, isAuthenticated } = require("../utils/features");
const {
  createNavigation,
  deleteNav,
  updateNav,
  getAllData,
  getNavById,
} = require("../controllers/navigation");

const router = express.Router();

router.route("/navigation").post(isAuthenticated, createNavigation);

router.route("/deleteNavigation/:id").delete(isAuthenticated, deleteNav);

router.route("/updateNavigation/:id").put(isAuthenticated, updateNav);

router.route("/getAllNavigations").get( getAllData);

router.route("/getNavById/:id").get(isAuthenticated, getNavById);


module.exports = router;
