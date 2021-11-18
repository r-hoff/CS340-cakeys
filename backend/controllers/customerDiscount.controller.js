const CustomerDiscount = require('../models/customerDiscount.model.js');

// create a new CustomerDiscount and save in the database
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  // create a new CustomerDiscount
  const customerDiscount = new CustomerDiscount({
    discount_name: req.body.discount_name,
    discount_rate: req.body.discount_rate,
  });

  CustomerDiscount.create(customerDiscount, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// retrieve all CustomerDiscounts from the database
exports.findAll = (req, res) => {
  CustomerDiscount.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// update a CustomerDiscount in the database
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  CustomerDiscount.updateById(req.params.id, new CustomerDiscount(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `CustomerDiscount with discount_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating CustomerDiscount with discount_ID = ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete a cake from the database
exports.delete = (req, res) => {
  CustomerDiscount.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `CustomerDiscount with discount_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete CustomerDiscount with discount_ID = ' + req.params.id,
        });
      }
    } else res.send({ message: `CustomerDiscount was deleted successfully.` });
  });
};
