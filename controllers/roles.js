const Roles = require("../models/Roles"); 

exports.createrole = async (req, res) => {
  try {
    const { name } = req.body;

    let existRole = await Roles.findOne({ name });
    if (existRole) {
      return res.status(400).json({
        success: false,
        message: "Role already exist!",
      });
    }

    const createRole = {
      name: req.body.name,
      navigations: req.body.navigations,
    };

    const newRole = await Roles.create(createRole);

    res.status(200).json({
      success: true,
      data: newRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const data = await Roles.find();
    const roleCount = await Roles.find().count();

    res.status(200).json({
      success: true,
      roleCount,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update Role by id
exports.updateRole = async (req, res) => {
  try {
    let existRole = await Roles.findById(req.params.id);
    console.log(existRole);
    if (!existRole) {
      return res.status(400).json({
        success: false,
        message: "Role not found!",
      });
    }

    const update = {
      name: req.body.name,
      navigations: req.body.navigations,
    };

    const updateRole = await Roles.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    res.status(200).json({
      success: true,
      data: updateRole,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// user delete
exports.deleteRole = async (req, res) => {
  try {
    console.log(req.params.id);
    const role = await Roles.findById(req.params.id);
    console.log("role", role);

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role not found!!",
      });
    }

    await role.deleteOne();

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
};
