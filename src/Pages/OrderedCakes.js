import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function OrderedCakes() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/ordered-cakes';
  const [orders, setOrders] = useState(null);
  const [newOrder, setNewOrder] = useState({
    order_ID: '',
    cake_ID: '',
    cake_sale_price_USD: '',
    cake_qty: '',
    order_status: '',
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
      <h1>OrderedCakes</h1>
      <p>Records details of Cakes ordered by Customers.</p>
      <div className='container'>
        <table>
          <caption>OrderedCakes Table</caption>
          <thead>
            <tr>
              <th>order_ID</th>
              <th>cake_ID</th>
              <th>cake_sale_price_USD</th>
              <th>cake_qty</th>
              <th>order_status</th>
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
                    <td>{order.cake_ID}</td>
                    <td>{Number(order.cake_sale_price_USD).toFixed(2)}</td>
                    <td>{order.cake_qty}</td>
                    <td>{order.order_status}</td>
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
              <label htmlFor='order_ID'>Order ID: </label>
              <label htmlFor='cake_ID'>Cake ID: </label>
              <label htmlFor='cake_sale_price_USD'>Cake Sale Price (USD): </label>
              <label htmlFor='cake_qty'>Quantity: </label>
              <label htmlFor='order_status'>Order Status: </label>
            </div>
            <div className='inputs'>
              <input type='number' id='order_ID' name='order_ID' onChange={onChange} required></input>
              <input type='number' id='cake_ID' name='cake_ID' onChange={onChange} required></input>
              <input type='number' placeholder='0.00' step='0.01' min='0' id='cake_sale_price_USD' name='cake_sale_price_USD' onChange={onChange}></input>
              <input type='number' id='cake_qty' name='cake_qty' onChange={onChange} required></input>
              <select id='order_status' name='order_status' onChange={onChange} required>
                <option value=''></option>
                <option value='Incomplete'>Incomplete</option>
                <option value='Awaiting Pickup'>Awaiting Pickup</option>
                <option value='Completed'>Completed</option>
              </select>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
