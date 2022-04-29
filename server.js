const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const path = require("path");

const hr = require("./routes/hr");
const admin = require("./routes/admin");

const manager = require("./routes/manager");
const employee = require("./routes/employee");
const cors = require("cors");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect("mongodb+srv://sangeetha:sangeetha123@cluster0.kl6wa.mongodb.net/LMS" || db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected !!"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/", manager);
app.use("/", hr);
app.use("/", employee);
app.use("/", admin);

// For Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    console.log(__filename);
    res.sendFile(path.resolve(__dirname + "/client/build/index.html")); // relative path
  });
}

const port = process.env.PORT || 7000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server running on port ${port} !`));