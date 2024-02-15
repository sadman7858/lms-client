// Import necessary libraries and styles
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './history.module.css';

// Your History component
function History() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/history')
      .then((res) => {
        if (res.data.status) {
          setBooks(res.data.result);
        } else {
          toast('Error fetching history!', { position: 'top-left' });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.main}>
      <div className={style.content}>
        {books.map((book, i) => (
          <div className={`${style.card} shadow-lg rounded`} key={i}>
            {/* <h6 className={style.title}>Book Id: {book.bid}</h6> */}
            <h6 className={style.title}>Book Name: {book.name}</h6>
            <p className={style.detail}>Book Author: {book.author}</p>
            <p className={style.detail}>Issued: {book.issued}</p>
            <p className={style.detail}>Returned: {book.returned}</p>
            <p className={style.detail}>Semester: {book.semester}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
