import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function OrderReviews() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/order-reviews';
  const [reviews, setReviews] = useState(null);
  const [newReview, setNewReview] = useState({
    overall_rating: '',
    product_quality_rating: 0,
    service_rating: 0,
    comment: '',
  });

  useEffect(() => {
    axios.get(url).then((res) => {
      setReviews(res.data);
    });
  }, []);

  const onChange = (event) => {
    setNewReview({ ...newReview, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newReview).then((res) => {
      setReviews([...reviews, res.data]);
    });
  };

  return (
    <div className='Page'>
      <h1>OrderReviews</h1>
      <p>Metrics captured on completed orders.</p>
      <div className='container'>
        <table>
          <caption>OrderReviews Table</caption>
          <thead>
            <tr>
              <th>review_ID</th>
              <th>overall_rating</th>
              <th>product_quality_rating</th>
              <th>service_rating</th>
              <th>comment</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review, index) => {
                return (
                  <tr key={index}>
                    <td>{review.review_ID}</td>
                    <td>{review.overall_rating}</td>
                    <td>{review.product_quality_rating}</td>
                    <td>{review.service_rating}</td>
                    <td>{review.comment}</td>
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
              <label htmlFor='overall_rating'>Overall Rating (1-10): </label>
              <label htmlFor='product_quality_rating'>Product Quality Rating (1-10): </label>
              <label htmlFor='service_rating'>Service Rating (1-10): </label>
              <label htmlFor='comment'>Comment: </label>
            </div>
            <div className='inputs'>
              <select type='number' id='overall_rating' name='overall_rating' onChange={onChange} required>
                <option value=''></option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
              <select type='number' id='product_quality_rating' name='product_quality_rating' onChange={onChange} required>
                <option value=''></option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
              <select type='number' id='service_rating' name='service_rating' onChange={onChange} required>
                <option value=''></option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
              <textarea id='comment' name='comment' onChange={onChange} />
            </div>
          </div>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}
