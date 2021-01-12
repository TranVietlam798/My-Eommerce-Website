const { json } = require("express");
const Users = require("../models/ueserModel");

const authAdmin = async (req, res, next) => {
  try {
    //get user information bty id
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role === 0)
      return res.status(400).json({ msg: "Admin resources access denied" });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;
