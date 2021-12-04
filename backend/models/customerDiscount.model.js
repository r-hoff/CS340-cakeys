const sql = require('./db.js');

// customerDiscount constructor model
const CustomerDiscount = function (customerDiscount) {
  this.discount_name = customerDiscount.discount_name;
  this.discount_rate = customerDiscount.discount_rate;
};

// create customerDiscount
CustomerDiscount.create = (newCustomerDiscount, result) => {
  sql.query('INSERT INTO CustomerDiscount SET ?', newCustomerDiscount, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('created CustomerDiscount: ', { discount_ID: res.insertId, ...newCustomerDiscount });
    result(null, { discount_ID: res.insertId, ...newCustomerDiscount });
  });
};

// get all customerDiscounts
CustomerDiscount.getAll = (result) => {
  let query = 'SELECT * FROM CustomerDiscount';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('CustomerDiscounts: ', res);
    result(null, res);
  });
};

// update a single customerDiscount by ID
CustomerDiscount.updateById = (id, customerDiscount, result) => {
  sql.query('UPDATE CustomerDiscount SET discount_name = ?, discount_rate = ? WHERE discount_ID = ?', [customerDiscount.discount_name, customerDiscount.discount_rate, id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('updated CustomerDiscount: ', { discount_ID: id, ...customerDiscount });
    result(null, { discount_ID: id, ...customerDiscount });
  });
};

// remove a single customerDiscount by id
CustomerDiscount.remove = (id, result) => {
  sql.query('DELETE FROM CustomerDiscount WHERE discount_ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted CustomerDiscount with discount_ID: ', id);
    result(null, res);
  });
};

module.exports = CustomerDiscount;
