const OrderedCake = require('../models/orderedCake.model.js');

// create a new OrderedCake and save in the database
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  // create a new OrderedCake
  const orderedCake = new OrderedCake({
    order_ID: req.body.order_ID,
    cake_ID: req.body.cake_ID,
    cake_sale_price_USD: req.body.cake_sale_price_USD,
    cake_qty: req.body.cake_qty,
    order_status: req.body.order_status,
  });

  OrderedCake.create(orderedCake, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// retrieve all OrderedCakes from the database
exports.findAll = (req, res) => {
  OrderedCake.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// update an OrderedCake in the database
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  let inputArray = req.params.id.split('&');
  let order_ID = parseInt(inputArray[0]);
  let cake_ID = parseInt(inputArray[1]);

  OrderedCake.updateById(order_ID, cake_ID, new OrderedCake(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `OrderedCake with order_ID = ${order_ID} and order_ID = ${cake_ID} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating OrderedCake with order_ID = ${order_ID} and order_ID = ${cake_ID}.`,
        });
      }
    } else res.send(data);
  });
};

// delete an OrderedCake from the database
exports.delete = (req, res) => {
  let inputArray = req.params.id.split('&');
  let order_ID = parseInt(inputArray[0]);
  let cake_ID = parseInt(inputArray[1]);

  OrderedCake.remove(order_ID, cake_ID, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `OrderedCake with order_ID = ${order_ID} and order_ID = ${cake_ID} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete OrderedCake with order_ID = ${order_ID} and order_ID = ${cake_ID}.`,
        });
      }
    } else res.send({ message: `OrderedCake was deleted successfully.` });
  });
};
