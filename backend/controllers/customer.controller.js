const Customer = require('../models/customer.model.js');

// create a new Customer and save in the database
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  // create a new Customer
  const customer = new Customer({
    customer_first_name: req.body.customer_first_name,
    customer_last_name: req.body.customer_last_name,
    customer_DOB: req.body.customer_DOB,
    customer_street_address: req.body.customer_street_address,
    customer_city: req.body.customer_city,
    customer_state: req.body.customer_state,
    customer_zip: req.body.customer_zip,
    customer_phone: req.body.customer_phone,
    customer_email: req.body.customer_email,
    discount_ID: req.body.discount_ID,
  });

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// retrieve all Customers from the database
exports.findAll = (req, res) => {
  Customer.getAll(req.params.last_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// update a Customer in the database
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  Customer.updateById(req.params.id, new Customer(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Customer with customer_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Customer with customer_ID = ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete a Customer from the database
exports.delete = (req, res) => {
  Customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Customer with customer_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Customer with customer_ID = ' + req.params.id,
        });
      }
    } else res.send({ message: `Customer was deleted successfully.` });
  });
};
