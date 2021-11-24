import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function Cakes() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/cakes';
  const [cakes, setCakes] = useState(null);
  const [newCake, setNewCake] = useState({
    cake_name: '',
    cake_retail_price_USD: 0.0,
    cake_size: 0.0,
  });

  useEffect(() => {
    axios.get(url).then((res) => {
      setCakes(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewCake({ ...newCake, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newCake).then((res) => {
      setCakes([...cakes, res.data]);
    });
  };

  return (
    <div className='Page'>
      <h1>Cakes</h1>
      <p>Cakes available for Customers to Order.</p>
      <div className='container'>
        <table>
          <caption>Cakes Table</caption>
          <thead>
            <tr>
              <th>cake_ID</th>
              <th>cake_name</th>
              <th>cake_size</th>
              <th>cake_retail_price_USD</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cakes &&
              cakes.map((cake, index) => {
                return (
                  <tr key={index}>
                    <td>{cake.cake_ID}</td>
                    <td>{cake.cake_name}</td>
                    <td>{cake.cake_size}</td>
                    <td>{Number(cake.cake_retail_price_USD).toFixed(2)}</td>
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
              <label htmlFor='cake_name'>Cake Name: </label>
              <label htmlFor='cake_size'>Cake Size (6-24 inches): </label>
              <label htmlFor='cake_retail_price_USD'>Cake Retail Price (USD): </label>
            </div>
            <div className='inputs'>
              <input type='text' id='cake_name' name='cake_name' onChange={onChange} required></input>
              <input type='number' min='6' max='24' id='cake_size' name='cake_size' onChange={onChange}></input>
              <input type='number' placeholder='0.00' step='0.01' min='0' id='cake_retail_price_USD' name='cake_retail_price_USD' onChange={onChange}></input>
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
