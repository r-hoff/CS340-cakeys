const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes for api endpoints
require('./routes/cake.routes.js')(app);
require('./routes/orderReview.routes.js')(app);
require('./routes/customerDiscount.routes.js')(app);
require('./routes/customer.routes.js')(app);
require('./routes/order.routes.js')(app);
require('./routes/orderedCake.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
