import React from 'react';
import './App.css';
import Customers from './Pages/Customers';
import CustomerDiscount from './Pages/CustomerDiscount';
import Orders from './Pages/Orders';
import OrderedCakes from './Pages/OrderedCakes';
import Cakes from './Pages/Cakes';
import OrderReviews from './Pages/OrderReviews';
import { HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function Main() {
  return (
    <Router>
      <div>
        <h3 className='centered'>Select an entity below to view, modify, and/or delete records:</h3>
        <div className='navigation'>
          <Link to='/customers' className='tab'>
            Customers
          </Link>
          <Link to='/customer-discount' className='tab'>
            CustomerDiscount
          </Link>
          <Link to='/orders' className='tab'>
            Orders
          </Link>
          <Link to='/ordered-cakes' className='tab'>
            OrderedCakes
          </Link>
          <Link to='/cakes' className='tab'>
            Cakes
          </Link>
          <Link to='/order-reviews' className='tab'>
            OrderReviews
          </Link>
        </div>
        <hr></hr>
        <Switch>
          <Route path='/customers'>
            <Customers />
          </Route>
          <Route path='/customer-discount'>
            <CustomerDiscount />
          </Route>
          <Route path='/orders'>
            <Orders />
          </Route>
          <Route path='/ordered-cakes'>
            <OrderedCakes />
          </Route>
          <Route path='/cakes'>
            <Cakes />
          </Route>
          <Route path='/order-reviews'>
            <OrderReviews />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
