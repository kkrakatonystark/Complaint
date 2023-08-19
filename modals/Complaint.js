const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    type: String,
    hostel: String,
    room: String,
    problemDetails: String,
    timeAvailable: String,
    name: String,
    studentId: String,
    givenTo: String,
    mobile: Number,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complaint", ComplaintSchema);
