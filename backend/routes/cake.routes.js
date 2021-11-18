module.exports = (app) => {
  const cakes = require('../controllers/cake.controller.js');

  var router = require('express').Router();

  // create a new cake
  router.post('/', cakes.create);

  // retrieve all cakes
  router.get('/', cakes.findAll);

  // update a cake by id
  router.put('/:id', cakes.update);

  // delete a cake by id
  router.delete('/:id', cakes.delete);

  app.use('/api/cakes', router);
};
