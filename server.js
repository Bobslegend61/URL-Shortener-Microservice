// Setting up express app and other required modules 
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");
// Port
const PORT = process.env.PORT || 3000;

// Static files setup
app.use(express.static(path.join(__dirname, "client")));

// set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// use routes
app.use('/new', postRoute);
app.use("/", getRoute);

// Port app will listen to
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});