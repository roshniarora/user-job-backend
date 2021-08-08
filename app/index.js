const express = require("express");
const router = require("../app/config/routes");
const app = express();
const configureDB = require("./config/database");
const port = 3055;

configureDB();

app.use(express.json());
app.use("/", router);
app.listen(port, () => {
  console.log("Server running on port", port);
});
