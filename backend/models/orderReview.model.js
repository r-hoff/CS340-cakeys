const sql = require('./db.js');

// orderReview constructor model
const OrderReview = function (orderReview) {
  this.overall_rating = orderReview.overall_rating;
  this.product_quality_rating = orderReview.product_quality_rating;
  this.service_rating = orderReview.service_rating;
  this.comment = orderReview.comment;
};

// create orderReview function
OrderReview.create = (newOrderReview, result) => {
  sql.query('INSERT INTO OrderReviews SET ?', newOrderReview, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created orderReview: ', { review_ID: res.insertId, ...newOrderReview });
    result(null, { review_ID: res.insertId, ...newOrderReview });
  });
};

// get all orderReviews function
OrderReview.getAll = (filter, result) => {
  let query = 'SELECT OrderReviews.review_ID, OrderReviews.overall_rating, OrderReviews.product_quality_rating, OrderReviews.service_rating, OrderReviews.comment FROM OrderReviews';

  // apply unassigned filter if present
  if (filter === 'filter') {
    query += ` LEFT JOIN Orders ON OrderReviews.review_ID = Orders.review_ID WHERE Orders.review_ID IS NULL`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('OrderReviews: ', res);
    result(null, res);
  });
};

// update a single OrderReview by ID
OrderReview.updateById = (id, orderReview, result) => {
  sql.query(
    'UPDATE OrderReviews SET overall_rating = ?, product_quality_rating = ?, service_rating = ?, comment = ? WHERE review_ID = ?',
    [orderReview.overall_rating, orderReview.product_quality_rating, orderReview.service_rating, orderReview.comment, id],
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

      console.log('updated OrderReview: ', { review_ID: id, ...orderReview });
      result(null, { review_ID: id, ...orderReview });
    }
  );
};

// remove a single cake by id
OrderReview.remove = (id, result) => {
  sql.query('DELETE FROM OrderReviews WHERE review_ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted OrderReview with id: ', id);
    result(null, res);
  });
};

module.exports = OrderReview;
