const { Admin } = require("../../models/adminModel");

const encrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const secret = "asldhaiudhuieqwjdbnjkasnx";

const jwtExpireTime = "1000";

const adminSignup = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    password1,
    password2,
  } = req.body;
  if (
    !(
      first_name &&
      last_name &&
      email &&
      phone_number &&
      address &&
      password1 &&
      password2
    )
  ) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    const oldAdmin = await Admin.findOne({ email: email });
    if (oldAdmin) {
      res.status(400).json({ message: "Admin already exists." });
    } else {
      if (password1 === password2) {
        encryptedPassword = await encrypt.hash(password1, 10);
        const admin = await new Admin({
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: address,
          password: encryptedPassword,
        });
        admin
          .save()
          .then(() => {
            access_token = jwt.sign(
              { user_email: email, token_type: "access" },
              secret,
              { expiresIn: jwtExpireTime.concat("ms") }
            );
            admin.token = access_token;
            admin.save();
            res
              .status(200)
              .json({ token_object: { type: "access", token: access_token } });
          })
          .catch((err) => {
            res.status(400).json({ message: err.message });
          });
      } else {
        res.status(400).json({ message: "Passwords does not match." });
      }
    }
  }
};

  const adminLogin = (req, res) => {
    res.status(200).json({ message: "Works" });
  };

module.exports = { adminSignup, adminLogin };
