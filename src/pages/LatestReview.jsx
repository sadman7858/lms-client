import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../pages/latestreview.module.css';

function LatestReview() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/studentauth/latestReview'
        );
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching latest reviews:', error.message);
      }
    };

    fetchLatestReviews();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest Reviews</h1>
      {books.length > 0 ? (
        <div className={styles.grid}>
          {books.map((book, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{book.btitle}</h2>
                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Author:</span>
                  <span className={styles.cardValue}>{book.bauthor}</span>
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Current Review:</span>
                  <span className={styles.cardValue}>{book.breview}</span>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.user}>
                    <img
                      className={styles.userImage}
                      src={`http://localhost:4000/images/${book.upic}`}
                      alt={`${book.user_name}'s profile`}
                    />
                    <span className={styles.userName}>{book.user_name}</span>
                  </div>
                  <div className={styles.dateTime}>
                    <p className={styles.date}>
                      {new Date(book.brdate).toLocaleDateString()}
                    </p>
                    <p className={styles.time}>
                      {new Date(book.brdate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center'>No reviews available</p>
      )}
    </div>
  );
}

export default LatestReview;
