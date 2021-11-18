module.exports = (app) => {
  const orders = require('../controllers/order.controller.js');

  var router = require('express').Router();

  // create a new order
  router.post('/', orders.create);

  // retrieve all orders
  router.get('/', orders.findAll);

  // update an order by id
  router.put('/:id', orders.update);

  // delete an order by id
  router.delete('/:id', orders.delete);

  app.use('/api/orders', router);
};
