import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from './heropart.module.css';
function LatestReview() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/latestReview')
      .then((res) => {
        setBooks(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, [books]);

  return (
    <div className={`container p-3 `}>
      <h1 className={`text-center mb-4 fw-bold ${style.stlrevone}`}>
        Latest Reviews
      </h1>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {books.map((book, i) => (
          <Col key={i}>
            <Card
              className={`  ${style.anim} ${style.stlrev} ${style.stlrevone} h-100`}
            >
              <Card.Body>
                <Card.Title>{book.btitle}</Card.Title>
                <div className='d-flex border-bottom justify-content-between mb-3'>
                  <p className='fw-bold'>Author:</p>
                  <p>{book.bauthor}</p>
                </div>
                <div className='d-flex border-bottom justify-content-between mb-3'>
                  <p className='fw-bold'>Current Review:</p>
                  <p>{book.breview}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <img
                      style={{ height: '50px', marginRight: '10px' }}
                      className='rounded-circle'
                      src={`http://localhost:4000/images/${book.upic}`}
                      alt={book.user_name}
                    />
                    <p className='m-0'>{book.user_name}</p>
                  </div>
                  <div>
                    <p className='m-0'>
                      {new Date(book.brdate).toLocaleDateString()}
                    </p>
                    <p className='m-0'>
                      {new Date(book.brdate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default LatestReview;
