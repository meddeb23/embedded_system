require("dotenv").config({ path: "./server/config/.env" });
const express = require("express");
const debug = require("debug")("app:startup");
const app = express();

// let DeviceStatus = [];
let DeviceStatus = [
  {
    _id: "1",
    name: "air condition",
    status: "16°C",
    isActive: true,
    type: "airCondition",
    usage: 12,
  },
  {
    _id: "3",
    name: "bed room 1 light",
    status: "on",
    isActive: false,
    type: "light",
    usage: 100,
  },
  {
    _id: "2",
    name: "living room light",
    status: "on",
    isActive: true,
    type: "light",
    usage: 45,
  },
  {
    _id: "4",
    name: "living room light",
    status: "on",
    isActive: true,
    type: "light",
    usage: 78,
  },
];

require("./startup/logging");
require("./startup/routes")(app);
// require("./startup/database")();
require("./startup/validation")();
// require("./startup/initSystem")().then((data) => (DeviceStatus = data));

// app.get("/", (req, res) => {
//   res.json({ msg: "Hello world 😃" });
// });

let connections = [];

/*
  @ GET /status
  @ Desc get device status updates
  @ Access private
*/

app.get("/status", (req, res) => {
  const { _id } = req.query;
  if (!_id) return res.status(400).json({ message: "unvalid user _id" });
  connections.push(res);
  // console.log(`client_id = ${_id} => ${connections.length} subscriptions`);
});

setInterval(() => {
  if (connections.length !== 0) {
    debug(id);
    // console.log("responding with data", status);
    connections.map((res) => res.json({ DeviceStatus }));
    connections = [];
  }
}, 8000);

let id = 0;

/*
  @ POST /:_id 
  @ Desc  change device status
  @ Access private
*/
app.post("/:_id", (req, res) => {
  const { _id } = req.params;
  const { status, isActive } = req.body;
  debug(_id, status, isActive);
  const idx = DeviceStatus.findIndex((device) => device._id === _id);
  if (idx === -1) return res.status(404).json({ message: "bad device _id" });
  DeviceStatus[idx].status = status;
  DeviceStatus[idx].isActive = isActive;
  id = DeviceStatus[idx]._id;
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
