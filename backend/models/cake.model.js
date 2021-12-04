const sql = require('./db.js');

// cake constructor model
const Cake = function (cake) {
  this.cake_name = cake.cake_name;
  this.cake_size = cake.cake_size;
  this.cake_retail_price_USD = cake.cake_retail_price_USD;
};

// create cake
Cake.create = (newCake, result) => {
  sql.query('INSERT INTO Cakes SET ?', newCake, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('created cake: ', { cake_ID: res.insertId, ...newCake });
    result(null, { cake_ID: res.insertId, ...newCake });
  });
};

// get all cakes
Cake.getAll = (result) => {
  let query = 'SELECT * FROM Cakes';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('cakes: ', res);
    result(null, res);
  });
};

// update a single cake by ID
Cake.updateById = (id, cake, result) => {
  sql.query('UPDATE Cakes SET cake_name = ?, cake_size = ?, cake_retail_price_USD = ? WHERE cake_ID = ?', [cake.cake_name, cake.cake_size, cake.cake_retail_price_USD, id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('updated cake ', { cake_ID: id, ...cake });
    result(null, { cake_ID: id, ...cake });
  });
};

// remove a single cake by id
Cake.remove = (id, result) => {
  sql.query('DELETE FROM Cakes WHERE cake_ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted cake ', id);
    result(null, res);
  });
};

module.exports = Cake;
