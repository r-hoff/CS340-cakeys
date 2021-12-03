import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function Customers() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/customers';
  const states = [
    'AK',
    'AL',
    'AR',
    'AS',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'GU',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MP',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UM',
    'UT',
    'VA',
    'VI',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];

  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(null);
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

  // get data from api to populate drop down
  const [discountOptions, setDiscountOptions] = useState(null);
  const [newDiscountOption, setNewDiscountOption] = useState({
    discount_ID: '',
    discount_name: '',
    discount_rate: '',
  });
  useEffect(() => {
    axios.get('http://flip1.engr.oregonstate.edu:9001/api/customer-discount').then((res) => {
      setDiscountOptions(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(url).then((res) => {
      setCustomers(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
    setNewDiscountOption({ ...newDiscountOption, [event.target.name]: event.target.value });
  };

  const onChangeUpdate = (event) => {
    setUpdateCustomer({ ...updateCustomer, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newCustomer).then((res) => {
      setCustomers([...customers, res.data]);
      event.target.reset();
    });
  };

  const onSubmitUpdate = (event) => {
    event.preventDefault();
    const id = updateCustomer.customer_ID;
    const updateUrl = url + '/' + id;
    axios.put(updateUrl, updateCustomer).then((res) => {
      if (res.data.code) {
        window.alert(res.data.sqlMessage + '. As a result, record was not updated.');
        axios.get(url).then((res) => {
          setCustomers(res.data);
        });
      } else {
        const updateArr = customers.slice();
        updateArr[
          customers.findIndex((customer) => {
            return customer.customer_ID === id;
          })
        ] = res.data;
        setCustomers(updateArr);
      }
      setShowUpdate(false);
    });
  };

  const onSearch = (event) => {
    event.preventDefault();
    const searchUrl = url + '/' + event.target[0].value;
    axios.get(searchUrl).then((res) => {
      setCustomers(res.data);
    });
  };

  const onClick = (index) => {
    const customer = customers[index];
    if (customer.discount_ID === null || customer.discount_ID === '0000-00-00') {
      customer.discount_ID = '';
    }
    customer.customer_DOB === null ? (customer.customer_DOB = '') : (customer.customer_DOB = customer.customer_DOB.slice(0, 10));
    setUpdateCustomer(customer);
    setShowUpdate(true);
  };

  const onDelete = (index) => {
    const id = customers[index].customer_ID;
    const deleteUrl = url + '/' + id;
    const confirmDelete = window.confirm('Would you like to delete this record?');
    if (confirmDelete === true) {
      axios.delete(deleteUrl).then((res) => {
        setCustomers(customers.filter((customer) => customer.customer_ID !== id));
      });
    }
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
                    <td>{customer.customer_DOB ? customer.customer_DOB.slice(0, 10) : 'N/A'}</td>
                    <td>{customer.customer_street_address}</td>
                    <td>{customer.customer_city}</td>
                    <td>{customer.customer_state}</td>
                    <td>{customer.customer_zip}</td>
                    <td>{customer.customer_phone}</td>
                    <td>{customer.customer_email}</td>
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
                  <label htmlFor='customer_ID'>Customer ID: </label>
                  <label htmlFor='discount_ID'>Discount ID (optional): </label>
                  <label htmlFor='customer_first_name'>First Name: </label>
                  <label htmlFor='customer_last_name'>Last Name: </label>
                  <label htmlFor='customer_DOB'>Date of Birth (optional): </label>
                  <label htmlFor='customer_street_address'>Street Address: </label>
                  <label htmlFor='customer_city'>City: </label>
                  <label htmlFor='customer_state'>State: </label>
                  <label htmlFor='customer_zip'>Zip Code: </label>
                  <label htmlFor='customer_phone'>Phone (Ex: 555-555-5555): </label>
                  <label htmlFor='customer_email'>Email: </label>
                </div>
                <div className='inputs'>
                  <input type='text' id='customer_ID' name='customer_ID' value={updateCustomer.customer_ID} readOnly></input>
                  <select id='discount_ID' name='discount_ID' onChange={onChangeUpdate} value={updateCustomer.discount_ID}>
                    <option value=''></option>
                    {discountOptions &&
                      discountOptions.map((discount, index) => {
                        return (
                          <option key={index} value={discount.discount_ID}>
                            {discount.discount_ID + ' - ' + discount.discount_name + ' (' + discount.discount_rate * 100 + '%)'}
                          </option>
                        );
                      })}
                  </select>
                  <input type='text' id='customer_first_name' name='customer_first_name' onChange={onChangeUpdate} value={updateCustomer.customer_first_name} required></input>
                  <input type='text' id='customer_last_name' name='customer_last_name' onChange={onChangeUpdate} value={updateCustomer.customer_last_name} required></input>
                  <input type='date' id='customer_DOB' name='customer_DOB' onChange={onChangeUpdate} value={updateCustomer.customer_DOB}></input>
                  <input type='text' id='customer_street_address' name='customer_street_address' onChange={onChangeUpdate} value={updateCustomer.customer_street_address} required></input>
                  <input type='text' id='customer_city' name='customer_city' onChange={onChangeUpdate} value={updateCustomer.customer_city} required></input>
                  <select id='customer_state' name='customer_state' onChange={onChangeUpdate} value={updateCustomer.customer_state} required>
                    <option value=''></option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                  <input type='text' pattern='[0-9]*' minLength='5' maxLength='5' id='customer_zip' name='customer_zip' onChange={onChangeUpdate} value={updateCustomer.customer_zip} required></input>
                  <input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' id='customer_phone' name='customer_phone' onChange={onChangeUpdate} value={updateCustomer.customer_phone} required></input>
                  <input type='email' id='customer_email' name='customer_email' onChange={onChangeUpdate} value={updateCustomer.customer_email} required></input>
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
              <label htmlFor='discount_ID'>Discount ID (optional): </label>
              <label htmlFor='customer_first_name'>First Name: </label>
              <label htmlFor='customer_last_name'>Last Name: </label>
              <label htmlFor='customer_DOB'>Date of Birth (optional): </label>
              <label htmlFor='customer_street_address'>Street Address: </label>
              <label htmlFor='customer_city'>City: </label>
              <label htmlFor='customer_state'>State: </label>
              <label htmlFor='customer_zip'>Zip Code: </label>
              <label htmlFor='customer_phone'>Phone (Ex: 555-555-5555): </label>
              <label htmlFor='customer_email'>Email: </label>
            </div>
            <div className='inputs'>
              <select id='discount_ID' name='discount_ID' onChange={onChange}>
                <option value=''></option>
                {discountOptions &&
                  discountOptions.map((discount, index) => {
                    return (
                      <option key={index} value={discount.discount_ID}>
                        {discount.discount_ID + ' - ' + discount.discount_name + ' (' + discount.discount_rate * 100 + '%)'}
                      </option>
                    );
                  })}
              </select>
              <input type='text' id='customer_first_name' name='customer_first_name' onChange={onChange} required></input>
              <input type='text' id='customer_last_name' name='customer_last_name' onChange={onChange} required></input>
              <input type='date' id='customer_DOB' name='customer_DOB' onChange={onChange}></input>
              <input type='text' id='customer_street_address' name='customer_street_address' onChange={onChange} required></input>
              <input type='text' id='customer_city' name='customer_city' onChange={onChange} required></input>
              <select id='customer_state' name='customer_state' onChange={onChange} required>
                <option value=''></option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
              <input type='text' pattern='[0-9]*' minLength='5' maxLength='5' id='customer_zip' name='customer_zip' onChange={onChange} required></input>
              <input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' id='customer_phone' name='customer_phone' onChange={onChange} required></input>
              <input type='email' id='customer_email' name='customer_email' onChange={onChange} required></input>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
