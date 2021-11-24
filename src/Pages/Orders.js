import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function Orders() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/orders';
  const [orders, setOrders] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customer_ID: '',
    order_total_USD: '',
    order_date_time: '',
    credit_card_number: '',
    credit_card_expiration: '',
    order_fill_date: '',
    order_pickup_date: '',
    review_ID: null,
  });

  useEffect(() => {
    axios.get(url).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newOrder).then((res) => {
      setOrders([...orders, res.data]);
      event.target.reset();
    });
  };

  return (
    <div className='Page'>
      <h1>Orders</h1>
      <p>Records details of Orders placed by Customers.</p>
      <div className='container'>
        <table>
          <caption>Orders Table</caption>
          <thead>
            <tr>
              <th>order_ID</th>
              <th>customer_ID</th>
              <th>order_total_USD</th>
              <th>order_date_time</th>
              <th>credit_card_number</th>
              <th>credit_card_expiration</th>
              <th>order_fill_date</th>
              <th>order_pickup_date</th>
              <th>review_ID</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.order_ID}</td>
                    <td>{order.customer_ID}</td>
                    <td>{Number(order.order_total_USD).toFixed(2)}</td>
                    <td>{order.order_date_time.slice(0, 10) + ' ' + order.order_date_time.slice(11, 16)}</td>
                    <td>{order.credit_card_number.slice(0, 4) + ' ' + order.credit_card_number.slice(4, 8) + ' ' + order.credit_card_number.slice(8, 12) + ' ' + order.credit_card_number.slice(12, 16)}</td>
                    <td>{order.credit_card_expiration}</td>
                    <td>{order.order_fill_date.slice(0, 10)}</td>
                    <td>{order.order_pickup_date.slice(0, 10)}</td>
                    <td>{order.review_ID}</td>
                    <td>
                      <RiDeleteBinLine color='red' />
                    </td>
                    <td>
                      <RiEditLine />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className='container'>
        <h3>Add New Record</h3>
        <form onSubmit={onSubmit}>
          <div className='rows'>
            <div className='labels'>
              <label htmlFor='customer_ID'>Customer ID: </label>
              <label htmlFor='order_total_USD'>Order Total (USD): </label>
              <label htmlFor='order_date_time'>Order Date: </label>
              <label htmlFor='credit_card_number'>Credit Card Number: </label>
              <label htmlFor='credit_card_expiration'>Credit Card Expiration: </label>
              <label htmlFor='order_fill_date'>Order Fill Date: </label>
              <label htmlFor='order_pickup_date'>Order Pickup Date: </label>
              <label htmlFor='review_ID'>Review ID: </label>
            </div>
            <div className='inputs'>
              <input type='number' id='customer_ID' name='customer_ID' onChange={onChange}></input>
              <input type='number' placeholder='0.00' step='0.01' min='0' id='order_total_USD' name='order_total_USD' onChange={onChange} required></input>
              <input type='datetime-local' id='order_date_time' name='order_date_time' onChange={onChange}></input>
              <input type='text' pattern='[0-9]*' minLength='16' maxLength='16' id='credit_card_number' name='credit_card_number' onChange={onChange} required></input>
              <input type='month' id='credit_card_expiration' name='credit_card_expiration' onChange={onChange} required></input>
              <input type='date' id='order_fill_date' name='order_fill_date' onChange={onChange} required></input>
              <input type='date' id='order_pickup_date' name='order_pickup_date' onChange={onChange} required></input>
              <input type='text' id='review_ID' name='review_ID' onChange={onChange}></input>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
