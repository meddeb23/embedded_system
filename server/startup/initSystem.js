const Device = require("../models/Device");

const debug = require("debug")("app:initSystem");

module.exports = async () => {
  const deviceStatus = [
    {
      name: "air condition",
      status: "16°C",
      isActive: true,
      type: "airCondition",
      usage: 12,
    },
    {
      name: "bed room 1 light",
      status: "on",
      isActive: false,
      type: "light",
      usage: 100,
    },
    {
      name: "living room light",
      status: "on",
      isActive: true,
      type: "light",
      usage: 45,
    },
    {
      name: "living room light",
      status: "on",
      isActive: true,
      type: "light",
      usage: 78,
    },
  ];
  const devices = await Device.find();
  if (devices.length === 0) {
    debug("Creating random devices....");
    deviceStatus.forEach(async (device) => {
      const newDevice = new Device(device);
      await newDevice.save();
    });
    debug("Creating devices.... Done");
  }
  return await Device.find();
};
