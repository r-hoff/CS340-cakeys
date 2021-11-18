const Cake = require('../models/cake.model.js');

// create a new cake and save in the database
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  // create a new Cake
  const cake = new Cake({
    cake_name: req.body.cake_name,
    cake_size: req.body.cake_size,
    cake_retail_price_USD: req.body.cake_retail_price_USD,
  });

  Cake.create(cake, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// retrieve all Cakes from the database
exports.findAll = (req, res) => {
  Cake.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

// update a cake in the database
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.',
    });
  }

  Cake.updateById(req.params.id, new Cake(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Cake with cake_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating cake with cake_ID = ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete a cake from the database
exports.delete = (req, res) => {
  Cake.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Cake with cake_ID = ${req.params.id} not found in database.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete cake with cake_ID = ' + req.params.id,
        });
      }
    } else res.send({ message: `Cake was deleted successfully.` });
  });
};
