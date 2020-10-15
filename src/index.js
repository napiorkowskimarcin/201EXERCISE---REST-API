let express = require("express");
let app = express();

//allow using path (__dirname), load a body to request (req.body)
let path = require("path");
let bodyParser = require("body-parser");

//load mongoose - connect to atlas mongoDB - inside a config file
const config = require("./config");
const mongoose = require("mongoose");

//import routes
let personRoute = require("./routes/person");
let customerRoute = require("./routes/customer");

mongoose.connect(config.db, {
  useCreateIndex: true, //solving deprecation worning
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB connected");
});
//actual use of bodyParser
app.use(bodyParser.json());

//printout of request - log time and messege from endpoints
app.use((req, res, next) => {
  console.log(`${new Date().toString()} -> ${req.originalUrl}`, req.body);
  next();
});

//use modules - to operate with endpoints and their body

app.use(personRoute);
app.use(customerRoute);
app.use(express.static("public"));

//SIMPLE ERROR HANDLERS
//handler for 404 - resourece not found
app.use((req, res, next) => {
  res.status(404).send("Not found (m)");
});
//handler for 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "../public/error500.html"));
});

//check if port is already declared (environment) and start listening on the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Serv has started on ${PORT}`));
