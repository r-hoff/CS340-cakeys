module.exports = (app) => {
  const customerDiscount = require('../controllers/customerDiscount.controller.js');

  var router = require('express').Router();

  // create a new customerDiscount
  router.post('/', customerDiscount.create);

  // retrieve all customerDiscounts
  router.get('/', customerDiscount.findAll);

  // update a customerDiscount by id
  router.put('/:id', customerDiscount.update);

  // delete a customerDiscount by id
  router.delete('/:id', customerDiscount.delete);

  app.use('/api/customer-discount', router);
};
