import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './acceptbookrequest.module.css';
function AcceptRequestBook() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/acceptrequest')
      .then((res) => {
        if (res.data.status) {
          setBooks(res.data.data);
        } else {
          toast('err!', { position: 'top-left' });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={style.main}>
      <div className={style.content}>
        {books.map((book, i) => {
          return (
            <div className={`${style.card} shadow-lg  rounded`} key={i}>
              <h6>
                <span className='fw-bold'>Book Id:</span> {book.bookid}
              </h6>
              <h6>
                <span className='fw-bold'>User Id:</span> {book.userid}
              </h6>
              <h6>
                <span className='fw-bold'>Issued:</span> {book.issued}
              </h6>
              <h6>
                <span className='fw-bold'>Book Name:</span> {book.bookname}
              </h6>
              <h6>
                <span className='fw-bold'>Author Name:</span> {book.author}
              </h6>
              <h6>
                <span className='fw-bold'>Semester:</span> {book.semester}
              </h6>
              <h6>
                <span className='fw-bold'>Username:</span> {book.username}
              </h6>
              <h6>
                <span className='fw-bold'>User Email:</span> {book.author}
              </h6>
              <h6>
                <span className='fw-bold'>User Role:</span> {book.role}
              </h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AcceptRequestBook;
