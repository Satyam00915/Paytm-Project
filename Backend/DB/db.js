const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const users = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    lowercase: true,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const accountsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", users);

const Account = mongoose.model("Account", accountsSchema);

module.exports = {
  User,
  Account,
};
