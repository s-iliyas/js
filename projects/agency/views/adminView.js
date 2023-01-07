const { Admin } = require("../models/adminModel");

const createAdmin = async (req, res) => {
  let { first_name, last_name, email, phone_number, address } = req.body;
  if (!(first_name && last_name && email && phone_number && address)) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    const admin = await new Admin({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      address: address,
    });
    admin
      .save()
      .then(() => {
        res.status(200).json({ message: "created" });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};

const getAdmins = async (req, res) => {
  const admins = await Admin.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getAdmin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.query.email })
    .then((result) => {
      if (result === null) {
        res.status(400).json({ message: `No Admin with ${req.query.email}` });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const updateAdmin = async (req, res) => {
  const req_data = req.body;
  const filter = { email: req.query.email };
  const admin = await Admin.updateOne(filter, req_data)
    .then(() => {
      res.status(200).json({ message: "Admin Updated" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

const deleteAdmin = async (req, res) => {
  const admin = Admin.deleteOne({ email: req.query.email })
    .then(() => {
      res.status(200).json({ message: "Admin deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
module.exports = { createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin };
