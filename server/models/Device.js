const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["light", "airCondition"],
    default: "light",
  },
  usage: {
    type: Number,
    default: 0,
  },
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
