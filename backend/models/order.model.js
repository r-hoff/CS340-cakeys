const sql = require('./db.js');

// Order constructor model
const Order = function (order) {
  this.order_total_USD = order.order_total_USD;
  this.order_date_time = order.order_date_time;
  this.credit_card_number = order.credit_card_number;
  this.credit_card_expiration = order.credit_card_expiration;
  this.order_fill_date = order.order_fill_date;
  this.order_pickup_date = order.order_pickup_date;
  this.customer_ID = order.customer_ID;
  this.review_ID = order.review_ID === '' ? null : order.review_ID;
};

// create Order
Order.create = (newOrder, result) => {
  sql.query('INSERT INTO Orders SET ?', newOrder, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Order: ', { order_ID: res.insertId, ...newOrder });
    result(null, { order_ID: res.insertId, ...newOrder });
  });
};

// get all Orders
Order.getAll = (result) => {
  let query = 'SELECT * FROM Orders';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('orders: ', res);
    result(null, res);
  });
};

// update a single Order by ID
Order.updateById = (id, order, result) => {
  sql.query(
    `UPDATE Orders SET order_total_USD = ?, order_date_time = ?, credit_card_number = ?, credit_card_expiration = ?, order_fill_date = ?, 
    order_pickup_date = ?, customer_ID = ?, review_ID = ? WHERE order_ID = ?`,
    [order.order_total_USD, order.order_date_time, order.credit_card_number, order.credit_card_expiration, order.order_fill_date, order.order_pickup_date, order.customer_ID, order.review_ID, id],
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

      console.log('updated order: ', { order_ID: id, ...order });
      result(null, { order_ID: id, ...order });
    }
  );
};

// remove a single Order by id
Order.remove = (id, result) => {
  sql.query('DELETE FROM Orders WHERE order_ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted order ', id);
    result(null, res);
  });
};

module.exports = Order;
