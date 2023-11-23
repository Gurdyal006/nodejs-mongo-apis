const Navigation = require("../models/Navigation");

exports.createNavigation = async (req, res) => {
  try {
    const { name } = req.body;

    let existData = await Navigation.findOne({ name });
    if (existData) {
      return res.status(400).json({
        success: false,
        message: "Data already exist!",
      });
    }

    const createData = {
      name: req.body.name,
    };

    const newData = await Navigation.create(createData);

    res.status(200).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update
exports.updateNav = async (req, res) => {
  try {
    const navId = req.params.id;

    const navData = await Navigation.findById(navId);
    if (!navData) {
      return res.status(400).json({
        success: false,
        message: "Data not found",
      });
    }

    const updateData = {
      name: req.body.name,
    };
    const newData = await Navigation.findByIdAndUpdate(navId, updateData, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });

    res.status(201).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteNav = async (req, res) => {
  try {
    const navData = await Navigation.findById(req.params.id);
    if (!navData) {
      return res.status(400).json({
        success: false,
        message: "Data not found",
      });
    }

    await navData.deleteOne();

    res.status(201).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all data
exports.getAllData = async (req, res) => {
  try {
    const data = await Navigation.find();

    const navCount = await Navigation.find().count();

    if (navCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "No data found!",
      });
    }

    res.status(200).json({
      success: true,
      navCount,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get data by id
exports.getNavById = async (req, res) => {
  const navId = req.params.id?.match(/^[0-9a-fA-F]{24}$/);

  try {
    const data = await Navigation.findById(navId);

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
};
