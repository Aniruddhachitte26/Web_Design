const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please enter company name"]
    },
    title: {
      type: String,
      required: [true, "Please enter job title"]
    },
    description: {
      type: String,
      required: [true, "Please enter job description"]
    },
    salary: {
      type: String,
      required: [true, "Please enter job salary"]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);