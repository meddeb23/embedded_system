const events = require("events");

const io = new events.EventEmitter();

io.on("status update", (status, connections) => {
  console.log("responding with data", status);
  connections.map((res) => res.json({ status }));
});
