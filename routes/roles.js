const express = require("express");
const { createrole, deleteRole, updateRole, getAllRoles } = require("../controllers/roles");
const { isAuthenticated } = require("../utils/features");

const router = express.Router();

//Routes

router.route("/roles").post(isAuthenticated, createrole);
router.route("/deleteRole/:id").delete(deleteRole);
router.route("/updateRole/:id").put(isAuthenticated, updateRole);
router.route("/getAllRoles").get(isAuthenticated, getAllRoles);



module.exports = router;
