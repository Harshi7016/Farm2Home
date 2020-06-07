import path from "path";
import userRoute from "./Route/Route";
const bodyParser = require("body-parser");
import productRoute from "./Route/productRoute";
const mongoose = require("mongoose");
const express = require("express");

const mongodbURL = process.env.MONGODB_URL;
mongoose.set("useCreateIndex", true);
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
