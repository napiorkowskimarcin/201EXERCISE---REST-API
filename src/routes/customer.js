let CustomerModel = require("../models/Customer.model");
let express = require("express");
let router = express.Router();

//Create a new customer;
router.post("/customer", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  //user has {name and email}
  let model = new CustomerModel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
