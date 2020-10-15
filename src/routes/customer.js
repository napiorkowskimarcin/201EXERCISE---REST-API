let CustomerModel = require("../models/Customer.model");
let express = require("express");
let router = express.Router();

//Create a new customer - POST REQUEST
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
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//Show customer by an email - GET REQUEST with findOne --------ok
router.get("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL email");
  }
  CustomerModel.findOne({
    email: req.query.email,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get("/customer/all", (req, res) => {
  CustomerModel.find()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Update one customer, PUT REQUEST and findOneAndUpdate
router.put("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL email");
  }
  CustomerModel.findOneAndUpdate({ email: req.query.email }, req.body, {
    new: true,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Update one customer, DELETE REQUEST and findOneAndRemove
router.delete("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL email");
  }
  CustomerModel.findOneAndRemove({ email: req.query.email })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
