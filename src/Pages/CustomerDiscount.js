import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function CustomerDiscount() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/customer-discount';
  const [discounts, setDiscounts] = useState(null);
  const [newDiscount, setNewDiscount] = useState({
    discount_name: '',
    discount_rate: 0.0,
  });

  useEffect(() => {
    axios.get(url).then((res) => {
      setDiscounts(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewDiscount({ ...newDiscount, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newDiscount).then((res) => {
      setDiscounts([...discounts, res.data]);
    });
  };

  return (
    <div className='Page'>
      <h1>CustomerDiscount</h1>
      <p>Special discounts applied to Customers.</p>
      <div className='container'>
        <table>
          <caption>CustomerDiscount Table</caption>
          <thead>
            <tr>
              <th>discount_ID</th>
              <th>discount_name</th>
              <th>discount_rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {discounts &&
              discounts.map((discount, index) => {
                return (
                  <tr key={index}>
                    <td>{discount.discount_ID}</td>
                    <td>{discount.discount_name}</td>
                    <td>{discount.discount_rate}</td>
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
              <label for='discount_name'>Discount Name: </label>
              <label for='discount_rate'>Discount Rate: </label>
            </div>
            <div className='inputs'>
              <input type='text' id='discount_name' name='discount_name' onChange={onChange} required></input>
              <input type='text' id='discount_rate' name='discount_rate' onChange={onChange} required></input>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
