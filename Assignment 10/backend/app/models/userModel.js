const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    type: {
      type: String,
      required: [true, "Please specify user type"],
      enum: ["admin", "employee"],
      default: "employee"
    },
    imagePath: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);