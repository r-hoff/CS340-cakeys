import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function CustomerDiscount() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/customer-discount';

  const [showUpdate, setShowUpdate] = useState(false);
  const [updateDiscount, setUpdateDiscount] = useState(null);
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

  const onChangeUpdate = (event) => {
    setUpdateDiscount({ ...updateDiscount, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newDiscount).then((res) => {
      setDiscounts([...discounts, res.data]);
      event.target.reset();
    });
  };

  const onSubmitUpdate = (event) => {
    event.preventDefault();
    const id = updateDiscount.discount_ID;
    const updateUrl = url + '/' + id;
    axios.put(updateUrl, updateDiscount).then((res) => {
      const updateArr = discounts.slice();
      updateArr[
        discounts.findIndex((discount) => {
          return discount.discount_ID === id;
        })
      ] = res.data;
      setDiscounts(updateArr);
      setShowUpdate(false);
    });
  };

  const onClick = (index) => {
    setUpdateDiscount(discounts[index]);
    setShowUpdate(true);
  };

  const onDelete = (index) => {
    const id = discounts[index].discount_ID;
    const deleteUrl = url + '/' + id;
    const confirmDelete = window.confirm('Would you like to delete this record?');
    if (confirmDelete === true) {
      axios.delete(deleteUrl).then((res) => {
        setDiscounts(discounts.filter((discount) => discount.discount_ID !== id));
      });
    }
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
                    <td>{discount.discount_rate * 100 + '%'}</td>
                    <td>
                      <RiDeleteBinLine className='iconClick' color='red' onClick={() => onDelete(index)} />
                    </td>
                    <td>
                      <RiEditLine className='iconClick' onClick={() => onClick(index)} />
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
                  <label htmlFor='discount_ID'>Discount ID: </label>
                  <label htmlFor='discount_name'>Discount Name: </label>
                  <label htmlFor='discount_rate'>Discount Rate (each 1% = 0.01): </label>
                </div>
                <div className='inputs'>
                  <input type='number' id='discount_ID' name='discount_ID' value={updateDiscount.discount_ID} readOnly></input>
                  <input type='text' id='discount_name' name='discount_name' onChange={onChangeUpdate} value={updateDiscount.discount_name} required></input>
                  <input type='number' placeholder='0.00' step='0.01' min='0' max='1' id='discount_rate' name='discount_rate' onChange={onChangeUpdate} value={updateDiscount.discount_rate} required></input>
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
              <label htmlFor='discount_name'>Discount Name: </label>
              <label htmlFor='discount_rate'>Discount Rate (each 1% = 0.01): </label>
            </div>
            <div className='inputs'>
              <input type='text' id='discount_name' name='discount_name' onChange={onChange} required></input>
              <input type='number' placeholder='0.00' step='0.01' min='0' max='1' id='discount_rate' name='discount_rate' onChange={onChange} required></input>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
