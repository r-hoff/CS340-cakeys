const sql = require('./db.js');

// OrderedCake constructor model
const OrderedCake = function (orderedCake) {
  this.order_ID = orderedCake.order_ID;
  this.cake_ID = orderedCake.cake_ID;
  this.cake_sale_price_USD = orderedCake.cake_sale_price_USD;
  this.cake_qty = orderedCake.cake_qty;
  this.order_status = orderedCake.order_status;
};

// create OrderedCake
OrderedCake.create = (newOrderedCake, result) => {
  sql.query('INSERT INTO OrderedCakes SET ?', newOrderedCake, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created OrderedCake: ', { ...newOrderedCake });
    result(null, { ...newOrderedCake });
  });
};

// get all OrderedCakes
OrderedCake.getAll = (result) => {
  let query = 'SELECT * FROM OrderedCakes';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('orderedCakes: ', res);
    result(null, res);
  });
};

// update a single OrderedCake by (order_ID & cake_ID)
OrderedCake.updateById = (order_ID, cake_ID, orderedCake, result) => {
  sql.query(
    'UPDATE OrderedCakes SET cake_sale_price_USD = ?, cake_qty = ?, order_status = ? WHERE order_ID = ? and cake_ID = ?',
    [orderedCake.cake_sale_price_USD, orderedCake.cake_qty, orderedCake.order_status, order_ID, cake_ID],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated OrderedCake ', { order_ID: order_ID, cake_ID: cake_ID });
      result(null, { order_ID: order_ID, cake_ID: cake_ID });
    }
  );
};

// remove a single OrderedCake by (order_ID & cake_ID)
OrderedCake.remove = (order_ID, cake_ID, result) => {
  sql.query('DELETE FROM OrderedCakes WHERE order_ID = ? and cake_ID = ?', [order_ID, cake_ID], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted cake ', { order_ID: order_ID, cake_ID: cake_ID });
    result(null, res);
  });
};

module.exports = OrderedCake;
