import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function Orders() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/orders';

  const [showUpdate, setShowUpdate] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(null);
  const [orders, setOrders] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customer_ID: '',
    order_total_USD: '',
    order_date_time: '',
    credit_card_number: '',
    credit_card_expiration: '',
    order_fill_date: '',
    order_pickup_date: '',
    review_ID: '',
  });

  // get data from apis to populate drop downs
  const [customerOptions, setCustomerOptions] = useState(null);
  const [newCustomerOption, setNewCustomerOption] = useState({
    customer_ID: '',
  });
  useEffect(() => {
    axios.get('http://flip1.engr.oregonstate.edu:9001/api/customers').then((res) => {
      setCustomerOptions(res.data);
    });
  }, []);
  const [reviewOptions, setReviewOptions] = useState(null);
  const [newReviewOption, setNewReviewOption] = useState({
    review_ID: '',
  });
  useEffect(() => {
    axios.get('http://flip1.engr.oregonstate.edu:9001/api/order-reviews').then((res) => {
      setReviewOptions(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(url).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
    setNewCustomerOption({ ...newCustomerOption, [event.target.name]: event.target.value });
    setNewReviewOption({ ...newReviewOption, [event.target.name]: event.target.value });
  };

  const onChangeUpdate = (event) => {
    setUpdateOrder({ ...updateOrder, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newOrder).then((res) => {
      setOrders([...orders, res.data]);
      event.target.reset();
    });
  };

  const onSubmitUpdate = (event) => {
    event.preventDefault();
    const id = updateOrder.order_ID;
    const updateUrl = url + '/' + id;
    axios.put(updateUrl, updateOrder).then((res) => {
      if (res.data.code) {
        window.alert(res.data.sqlMessage + '. As a result, record was not updated.');
        axios.get(url).then((res) => {
          setOrders(res.data);
        });
      } else {
        const updateArr = orders.slice();
        updateArr[
          orders.findIndex((order) => {
            return order.order_ID === id;
          })
        ] = res.data;
        setOrders(updateArr);
      }
      setShowUpdate(false);
    });
  };

  const onClick = (index) => {
    const order = orders[index];
    if (order.review_ID === null) {
      order.review_ID = '';
    }
    order.order_date_time = order.order_date_time.slice(0, 16);
    order.order_fill_date === null ? (order.order_fill_date = '') : (order.order_fill_date = order.order_fill_date.slice(0, 10));
    order.order_pickup_date === null ? (order.order_pickup_date = '') : (order.order_pickup_date = order.order_pickup_date.slice(0, 10));

    setUpdateOrder(orders[index]);
    setShowUpdate(true);
  };

  const onDelete = (index) => {
    const id = orders[index].order_ID;
    const deleteUrl = url + '/' + id;
    const confirmDelete = window.confirm('Would you like to delete this record?');
    if (confirmDelete === true) {
      axios.delete(deleteUrl).then((res) => {
        setOrders(orders.filter((order) => order.order_ID !== id));
      });
    }
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
                    <td>{order.review_ID ? order.review_ID : 'None'}</td>
                    <td>
                      <RiEditLine className='iconClick' onClick={() => onClick(index)} />
                    </td>
                    <td>
                      <RiDeleteBinLine className='iconClick' color='red' onClick={() => onDelete(index)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        {showUpdate && (
          <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmitUpdate}>
              <div className='rows'>
                <div className='labels'>
                  <label htmlFor='order_ID'>Order ID: </label>
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
                  <input type='number' id='order_ID' name='order_ID' value={updateOrder.order_ID} readOnly></input>
                  <select id='customer_ID' name='customer_ID' onChange={onChangeUpdate} value={updateOrder.customer_ID} required>
                    <option value=''></option>
                    {customerOptions &&
                      customerOptions.map((customer, index) => {
                        return (
                          <option key={index} value={customer.customer_ID}>
                            {customer.customer_ID + ' - ' + customer.customer_first_name + ' ' + customer.customer_last_name}
                          </option>
                        );
                      })}
                  </select>
                  <input type='number' placeholder='0.00' step='0.01' min='0' id='order_total_USD' name='order_total_USD' onChange={onChangeUpdate} value={updateOrder.order_total_USD} required></input>
                  <input type='datetime-local' id='order_date_time' name='order_date_time' onChange={onChangeUpdate} value={updateOrder.order_date_time} required></input>
                  <input type='text' pattern='[0-9]*' minLength='16' maxLength='16' id='credit_card_number' name='credit_card_number' onChange={onChangeUpdate} value={updateOrder.credit_card_number} required></input>
                  <input type='month' id='credit_card_expiration' name='credit_card_expiration' onChange={onChangeUpdate} value={updateOrder.credit_card_expiration} required></input>
                  <input type='date' id='order_fill_date' name='order_fill_date' onChange={onChangeUpdate} value={updateOrder.order_fill_date}></input>
                  <input type='date' id='order_pickup_date' name='order_pickup_date' onChange={onChangeUpdate} value={updateOrder.order_pickup_date}></input>
                  <select id='review_ID' name='review_ID' onChange={onChangeUpdate} value={updateOrder.review_ID}>
                    <option value=''></option>
                    {reviewOptions &&
                      reviewOptions.map((review, index) => {
                        return (
                          <option key={index} value={review.review_ID}>
                            {review.review_ID}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <input type='submit' value='Submit'></input>
            </form>
          </div>
        )}
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
              <select id='customer_ID' name='customer_ID' onChange={onChange} required>
                <option value=''></option>
                {customerOptions &&
                  customerOptions.map((customer, index) => {
                    return (
                      <option key={index} value={customer.customer_ID}>
                        {customer.customer_ID + ' - ' + customer.customer_first_name + ' ' + customer.customer_last_name}
                      </option>
                    );
                  })}
              </select>
              <input type='number' placeholder='0.00' step='0.01' min='0' id='order_total_USD' name='order_total_USD' onChange={onChange} required></input>
              <input type='datetime-local' id='order_date_time' name='order_date_time' onChange={onChange} required></input>
              <input type='text' pattern='[0-9]*' minLength='16' maxLength='16' id='credit_card_number' name='credit_card_number' onChange={onChange} required></input>
              <input type='month' id='credit_card_expiration' name='credit_card_expiration' onChange={onChange} required></input>
              <input type='date' id='order_fill_date' name='order_fill_date' onChange={onChange}></input>
              <input type='date' id='order_pickup_date' name='order_pickup_date' onChange={onChange}></input>
              <select id='review_ID' name='review_ID' onChange={onChange}>
                <option value=''></option>
                {reviewOptions &&
                  reviewOptions.map((review, index) => {
                    return (
                      <option key={index} value={review.review_ID}>
                        {review.review_ID}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
