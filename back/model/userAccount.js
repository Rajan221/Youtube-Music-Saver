const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Account with this email already exists"],
  },
  password: {
    type: String,
  },
});

const Account = new mongoose.model("Account", AccountSchema);

module.exports = Account;
