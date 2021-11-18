const Order = require('../models/order.model.js');

// create a new Order and save in the database
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  // create a new Order
  const order = new Order({
    order_total_USD: req.body.order_total_USD,
    order_date_time: req.body.order_date_time,
    credit_card_number: req.body.credit_card_number,
    credit_card_expiration: req.body.credit_card_expiration,
    order_fill_date: req.body.order_fill_date,
    order_pickup_date: req.body.order_pickup_date,
    customer_ID: req.body.customer_ID,
    review_ID: req.body.review_ID,
  });

  Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// retrieve all Orders from the database
exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// update an Order in the database
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  Order.updateById(req.params.id, new Order(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Order with order_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Order with order_ID = ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete an Order from the database
exports.delete = (req, res) => {
  Order.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Order with order_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Order with order_ID = ' + req.params.id,
        });
      }
    } else res.send({ message: `Order was deleted successfully.` });
  });
};
