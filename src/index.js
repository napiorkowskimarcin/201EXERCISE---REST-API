let express = require("express");
let app = express();
let personRoute = require("./routes/person");
let path = require("path");

app.use((req, res, next) => {
  console.log(`${new Date().toString()} -> ${req.originalUrl}`);
  next();
});

app.use(personRoute);
app.use(express.static("public"));
//handler for 404 - resourece not found
app.use((req, res, next) => {
  res.status(404).send("Not found (m)");
});
//handler for 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "../public/error500.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Serv has started on ${PORT}`));
