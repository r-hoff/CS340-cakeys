import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function Customers() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/customers';
  const [customers, setCustomers] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    discount_ID: '',
    customer_first_name: '',
    customer_last_name: '',
    customer_DOB: '',
    customer_street_address: '',
    customer_city: '',
    customer_state: '',
    customer_zip: '',
    customer_phone: '',
    customer_email: '',
  });

  useEffect(() => {
    axios.get(url).then((res) => {
      setCustomers(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newCustomer).then((res) => {
      setCustomers([...customers, res.data]);
    });
  };

  const onSearch = (event) => {
    event.preventDefault();
    const searchUrl = url + '/' + event.target[0].value;
    axios.get(searchUrl).then((res) => {
      setCustomers(res.data);
    });
  };

  return (
    <div className='Page'>
      <h1>Customers</h1>
      <p>Records details of Customers who order cakes.</p>
      <form onSubmit={onSearch}>
        <label>Find customers by last name:</label>
        <input type='text' id='searchbar' name='searchbar'></input>
        <button>Search</button>
      </form>
      <div className='container'>
        <table>
          <caption>Customers Table</caption>
          <thead>
            <tr>
              <th>customer_ID</th>
              <th>discount_ID</th>
              <th>customer_first_name</th>
              <th>customer_last_name</th>
              <th>customer_DOB</th>
              <th>customer_street_address</th>
              <th>customer_city</th>
              <th>customer_state</th>
              <th>customer_zip</th>
              <th>customer_phone</th>
              <th>customer_email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, index) => {
                return (
                  <tr key={index}>
                    <td>{customer.customer_ID}</td>
                    <td>{customer.discount_ID ? customer.discount_ID : 'None'}</td>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_DOB}</td>
                    <td>{customer.customer_street_address}</td>
                    <td>{customer.customer_city}</td>
                    <td>{customer.customer_state}</td>
                    <td>{customer.customer_zip}</td>
                    <td>{customer.customer_phone}</td>
                    <td>{customer.customer_email}</td>
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
              <label for='discount_ID'>Discount ID (optional): </label>
              <label for='customer_first_name'>First Name: </label>
              <label for='customer_last_name'>Last Name: </label>
              <label for='customer_DOB'>Date of Birth: </label>
              <label for='customer_street_address'>Street Address: </label>
              <label for='customer_city'>City: </label>
              <label for='customer_state'>State: </label>
              <label for='customer_zip'>Zip Code: </label>
              <label for='customer_phone'>Phone: </label>
              <label for='customer_email'>Email: </label>
            </div>
            <div className='inputs'>
              <input type='text' id='discount_ID' name='discount_ID' onChange={onChange}></input>
              <input type='text' id='customer_first_name' name='customer_first_name' onChange={onChange} required></input>
              <input type='text' id='customer_last_name' name='customer_last_name' onChange={onChange} required></input>
              <input type='date' id='customer_DOB' name='customer_DOB' onChange={onChange}></input>
              <input type='text' id='customer_street_address' name='customer_street_address' onChange={onChange} required></input>
              <input type='text' id='customer_city' name='customer_city' onChange={onChange} required></input>
              <input type='text' id='customer_state' name='customer_state' onChange={onChange} required></input>
              <input type='text' id='customer_zip' name='customer_zip' onChange={onChange} required></input>
              <input type='text' id='customer_phone' name='customer_phone' onChange={onChange} required></input>
              <input type='text' id='customer_email' name='customer_email' onChange={onChange} required></input>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
