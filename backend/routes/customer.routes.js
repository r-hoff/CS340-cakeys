module.exports = (app) => {
  const customers = require('../controllers/customer.controller.js');

  var router = require('express').Router();

  // create a new customer
  router.post('/', customers.create);

  // retrieve all customers
  router.get('/', customers.findAll);

  // retrieve all customers by last_name
  router.get('/:last_name', customers.findAll);

  // update a customer by id
  router.put('/:id', customers.update);

  // delete a customer by id
  router.delete('/:id', customers.delete);

  app.use('/api/customers', router);
};
