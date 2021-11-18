const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
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
