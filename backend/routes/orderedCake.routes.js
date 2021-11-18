module.exports = (app) => {
  const orderedCakes = require('../controllers/orderedCake.controller.js');

  var router = require('express').Router();

  // create a new orderedCake
  router.post('/', orderedCakes.create);

  // retrieve all orderedCakes
  router.get('/', orderedCakes.findAll);

  // update a orderedCake by (order_ID & cake_ID)
  router.put('/:id', orderedCakes.update);

  // delete a orderedCake by (order_ID & cake_ID)
  router.delete('/:id', orderedCakes.delete);

  app.use('/api/ordered-cakes', router);
};
