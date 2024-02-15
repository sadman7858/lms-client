import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { GiTireIronCross } from 'react-icons/gi';
import style from './studenthome.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './modals.module.css';
function Modals({ book }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleReview = (dt) => {
    axios
      .post(`http://localhost:4000/studentauth/review/${book.id}`, {
        review: dt.rating,
      })
      .then((res) => {
        console.log(res, 'res in rat');
        toast.error(res.data.err, { position: 'top-right' });
        setShow(false);
      })
      .catch((err) => console.log(err.message));
  };
  console.log(book.reviews);

  return (
    <>
      <p className={style.str} onClick={handleShow}>
        <p className={style.str} onClick={handleShow}>
          {Array.from({ length: book.reviews }, (_, index) => (
            <FaStar key={index} />
          ))}
          {Array.from({ length: 5 - book.reviews }, (_, index) => (
            <FaRegStar key={index} />
          ))}
        </p>
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className={`${styles.bgmd}`}>
          <Modal.Title>Give Review</Modal.Title>
          <h3 className={`${styles.bgmdclose}`} onClick={handleClose}>
            <GiTireIronCross />
          </h3>
        </Modal.Header>
        <Modal.Body className={`${styles.bgmd}`}>
          <p className={`${styles.desc}`}>
            <span className='fst-italic'> {book.name}</span> is a fantastic book
            written by <span className='fst-italic'>{book.author}.</span> The
            content is well-structured and covers essential topics. It is highly
            recommended and well-known. If you find it helpful, please consider
            giving it a star rating. Current Star Rating is {book.reviews}{' '}
            Stars.
          </p>
          <form
            className='d-flex justify-content-around g-4'
            noValidate
            onSubmit={handleSubmit(handleReview)}
          >
            <select
              className={`${styles.bgmd}`}
              name='rating'
              id='rating'
              {...register('rating', { required: true })}
            >
              <option value=''>Star</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <Button variant='info' type='submit'>
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;
