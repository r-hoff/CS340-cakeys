const OrderReview = require('../models/orderReview.model.js');

// create a new OrderReview and save in the database
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  // create a new OrderReview
  const orderReview = new OrderReview({
    overall_rating: req.body.overall_rating,
    product_quality_rating: req.body.product_quality_rating,
    service_rating: req.body.service_rating,
    comment: req.body.comment,
  });

  OrderReview.create(orderReview, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// Retrieve all OrderReviews from the database
exports.findAll = (req, res) => {
  OrderReview.getAll(req.params.filter, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// update an OrderReview in the database
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  OrderReview.updateById(req.params.id, new OrderReview(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `OrderReview with review_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating OrderReview with review_ID = ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete an OrderReview from the database
exports.delete = (req, res) => {
  OrderReview.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `OrderReview with review_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete orderReview with review_ID = ' + req.params.id,
        });
      }
    } else res.send({ message: `OrderReview was deleted successfully.` });
  });
};
