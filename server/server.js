require("dotenv").config({ path: "./server/config/.env" });
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/validation")();

const Department = require("./models/Department");

app.get("/", (req, res) => {
  res.json({ msg: "Hello world 😃" });
});

let status = [];
Department.find().then((data) => {
  status;
});
let connections = [];

app.post("/service", async (req, res) => {
  const { name } = req.body;
  const dep = new Department({
    name,
  });
  const newDep = await dep.save();
  res.json(newDep);
});

app.get("/status", (req, res) => {
  const { _id } = req.query;
  if (!_id) return res.status(400).json({ message: "unvalid user _id" });
  connections.push(res);
  console.log(`client_id = ${_id} => ${connections.length} subscriptions`);
});

setInterval(() => {
  if (connections.length !== 0) {
    console.log("responding with data", status);
    connections.map((res) => res.json({ status }));
    connections = [];
  }
}, 8000);

app.post("/", (req, res) => {
  const { motionDetected } = req.body;
  console.log(motionDetected);
  status.motionCounter++;
  res.status(200).json({ sucess: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
