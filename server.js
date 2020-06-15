const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const path = require("path");
require("./models/User");
require("./services/passport");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(cookieParser());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:28017/react-scheduler",
  () => {
    console.log("connected to db");
  }
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


require("./routes/authRoute")(app);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
