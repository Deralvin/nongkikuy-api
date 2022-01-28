const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();
const multer = require('multer')
const path = require('path')
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8081/', true);
xhr.withCredentials = true;
xhr.send(null);

//for access image
app.use('/images', express.static('images'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/kedai.routes.js")(app);
require("./app/routes/user.routes.js")(app)
require("./app/routes/kota.routes.js")(app)
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);
  console.log(__dirname + '/app/public/images');

});
