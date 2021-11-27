const sql = require('./db.js');

// Customer constructor model
const Customer = function (customer) {
  this.customer_first_name = customer.customer_first_name;
  this.customer_last_name = customer.customer_last_name;
  this.customer_DOB = customer.customer_DOB === '0000-00-00' ? null : customer.customer_DOB;
  this.customer_street_address = customer.customer_street_address;
  this.customer_city = customer.customer_city;
  this.customer_state = customer.customer_state;
  this.customer_zip = customer.customer_zip;
  this.customer_phone = customer.customer_phone;
  this.customer_email = customer.customer_email;
  this.discount_ID = customer.discount_ID === '' ? null : customer.discount_ID;
};

// create Customer
Customer.create = (newCustomer, result) => {
  sql.query('INSERT INTO Customers SET ?', newCustomer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created cake: ', { customer_ID: res.insertId, ...newCustomer });
    result(null, { customer_ID: res.insertId, ...newCustomer });
  });
};

// get all Customers (filter if present)
Customer.getAll = (last_name, result) => {
  let query = 'SELECT * FROM Customers';

  // apply customer_last_name filter if present
  if (last_name) {
    query += ` WHERE customer_last_name LIKE '%${last_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('customers: ', res);
    result(null, res);
  });
};

// update a single Customer by ID
Customer.updateById = (id, customer, result) => {
  sql.query(
    `UPDATE Customers SET customer_first_name = ?, customer_last_name = ?, customer_DOB = ?, customer_street_address = ?, customer_city = ?, 
    customer_state = ?, customer_zip = ?, customer_phone = ?, customer_email = ?, discount_ID = ? WHERE customer_ID = ?`,
    [
      customer.customer_first_name,
      customer.customer_last_name,
      customer.customer_DOB,
      customer.customer_street_address,
      customer.customer_city,
      customer.customer_state,
      customer.customer_zip,
      customer.customer_phone,
      customer.customer_email,
      customer.discount_ID,
      id,
    ],
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

      console.log('updated customer ', { customer_ID: id, ...customer });
      result(null, { customer_ID: id, ...customer });
    }
  );
};

// remove a single Customer by id
Customer.remove = (id, result) => {
  sql.query('DELETE FROM Customers WHERE customer_ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted Customer ', id);
    result(null, res);
  });
};

module.exports = Customer;
