import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';

export default function OrderReviews() {
  const url = 'http://flip1.engr.oregonstate.edu:9001/api/order-reviews';

  const [showUpdate, setShowUpdate] = useState(false);
  const [updateReview, setUpdateReview] = useState(null);
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

  const onChangeUpdate = (event) => {
    setUpdateReview({ ...updateReview, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(url, newReview).then((res) => {
      setReviews([...reviews, res.data]);
      event.target.reset();
    });
  };

  const onSubmitUpdate = (event) => {
    event.preventDefault();
    const id = updateReview.review_ID;
    const updateUrl = url + '/' + id;
    axios.put(updateUrl, updateReview).then((res) => {
      const updateArr = reviews.slice();
      updateArr[
        reviews.findIndex((review) => {
          return review.review_ID === id;
        })
      ] = res.data;
      console.log(updateArr)
      setReviews(updateArr);
      setShowUpdate(false);
    });
  };

  const onClick = (index) => {
    setUpdateReview(reviews[index]);
    setShowUpdate(true);
  };

  const onDelete = (index) => {
    console.log(index)
    const id = reviews[index].review_ID;
    const deleteUrl = url + '/' + id;
    const confirmDelete = window.confirm('Would you like to delete this record?');
    if (confirmDelete === true) {
      axios.delete(deleteUrl).then((res) => {
        setReviews(reviews.filter((review) => review.review_ID !== id));
      });
    }
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
                  <label htmlFor='review_ID'>Review ID: </label>
                  <label htmlFor='overall_rating'>Overall Rating (1-5): </label>
                  <label htmlFor='product_quality_rating'>Product Quality Rating (1-5): </label>
                  <label htmlFor='service_rating'>Service Rating (1-5): </label>
                  <label htmlFor='comment'>Comment: </label>
                </div>
                <div className='inputs'>
                  <input type='number' id='review_ID' name='review_ID' value={updateReview.review_ID} readOnly></input>
                  <select type='number' id='overall_rating' name='overall_rating' onChange={onChangeUpdate} value={updateReview.overall_rating} required>
                    <option value=''></option>
                    <option value='5'>5 - Very Satisfied</option>
                    <option value='4'>4 - Satisfied</option>
                    <option value='3'>3 - Neutral</option>
                    <option value='2'>2 - Dissatisfied</option>
                    <option value='1'>1 - Very Dissatisfied</option>
                  </select>
                  <select type='number' id='product_quality_rating' name='product_quality_rating' onChange={onChangeUpdate} value={updateReview.product_quality_rating} required>
                    <option value=''></option>
                    <option value='5'>5 - Very Satisfied</option>
                    <option value='4'>4 - Satisfied</option>
                    <option value='3'>3 - Neutral</option>
                    <option value='2'>2 - Dissatisfied</option>
                    <option value='1'>1 - Very Dissatisfied</option>
                  </select>
                  <select type='number' id='service_rating' name='service_rating' onChange={onChangeUpdate} value={updateReview.service_rating} required>
                    <option value=''></option>
                    <option value='5'>5 - Very Satisfied</option>
                    <option value='4'>4 - Satisfied</option>
                    <option value='3'>3 - Neutral</option>
                    <option value='2'>2 - Dissatisfied</option>
                    <option value='1'>1 - Very Dissatisfied</option>
                  </select>
                  <textarea id='comment' name='comment' onChange={onChangeUpdate} value={updateReview.comment} />
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
              <label htmlFor='overall_rating'>Overall Rating (1-5): </label>
              <label htmlFor='product_quality_rating'>Product Quality Rating (1-5): </label>
              <label htmlFor='service_rating'>Service Rating (1-5): </label>
              <label htmlFor='comment'>Comment: </label>
            </div>
            <div className='inputs'>
              <select type='number' id='overall_rating' name='overall_rating' onChange={onChange} required>
                <option value=''></option>
                <option value='5'>5 - Very Satisfied</option>
                <option value='4'>4 - Satisfied</option>
                <option value='3'>3 - Neutral</option>
                <option value='2'>2 - Dissatisfied</option>
                <option value='1'>1 - Very Dissatisfied</option>
              </select>
              <select type='number' id='product_quality_rating' name='product_quality_rating' onChange={onChange} required>
                <option value=''></option>
                <option value='5'>5 - Very Satisfied</option>
                <option value='4'>4 - Satisfied</option>
                <option value='3'>3 - Neutral</option>
                <option value='2'>2 - Dissatisfied</option>
                <option value='1'>1 - Very Dissatisfied</option>
              </select>
              <select type='number' id='service_rating' name='service_rating' onChange={onChange} required>
                <option value=''></option>
                <option value='5'>5 - Very Satisfied</option>
                <option value='4'>4 - Satisfied</option>
                <option value='3'>3 - Neutral</option>
                <option value='2'>2 - Dissatisfied</option>
                <option value='1'>1 - Very Dissatisfied</option>
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
