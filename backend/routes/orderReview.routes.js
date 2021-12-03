module.exports = (app) => {
  const orderReviews = require('../controllers/orderReview.controller.js');

  var router = require('express').Router();

  // create a new order_review
  router.post('/', orderReviews.create);

  // Retrieve all orderReviews
  router.get('/', orderReviews.findAll);

  // update an orderReview by id
  router.put('/:id', orderReviews.update);

  // delete an orderReview by id
  router.delete('/:id', orderReviews.delete);

  app.use('/api/order-reviews', router);
};
