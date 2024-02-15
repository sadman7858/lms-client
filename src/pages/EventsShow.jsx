import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import style from './heropart.module.css';
import { MdLocalLibrary } from 'react-icons/md';
import { Button } from 'react-bootstrap';

function EventsShow() {
  const [events, setEvents] = useState([]);
  const [regi, setRegi] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/showevent')
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/showeventregister')
      .then((res) => {
        setRegi(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className={`container p-3 `}>
      {events.length > 0 ? (
        <h1 className={`text-center mb-4 fw-bold ${style.stlrevone}`}>
          Upcoming Events
        </h1>
      ) : null}
      <Row xs={1} md={2} lg={3} className='g-4'>
        {events.map((book, i) => {
          const isRegistered = regi.some((rg) => rg.event_id === book.id);

          return (
            <Col key={i}>
              <Card
                className={` ${style.anim} ${style.stlrev} ${style.stlrevone} h-100`}
              >
                <Card.Body>
                  <Card.Title>
                    <div className='d-flex border-bottom align-items-center mb-3'>
                      <MdLocalLibrary className='fs-1 me-3' />
                      <div>
                        <p className='fw-bold text-capitalize'>{book.title}</p>
                        <div className='d-flex '>
                          {new Date() >
                          new Date(book.shedule_date.split('T')[0]) ? (
                            <p className='fs-6 me-3'>Deadline: Over</p>
                          ) : (
                            <p className='fs-6 me-3'>
                              Deadline: {book.shedule_date.split('T')[0]}
                            </p>
                          )}
                          {isRegistered ? (
                            <p className=' fs-6 mb-2 ms-3 text-info'>
                              Registered
                            </p>
                          ) : (
                            <Link
                              to={'/student/dashbord/event-dlts'}
                              state={book}
                            >
                              <Button
                                variant='info'
                                className=' fs-6 mb-2 ms-3'
                              >
                                Register Now
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Title>
                  <div className='d-flex border-bottom  mb-3'>
                    <p className='fw-bold me-2'>Description:</p>
                    <p>{book.description.slice(0, 70) + '...'}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <p className=' m-0'>
                        <span className='fw-bold '>Location:</span>{' '}
                        {book.location}
                      </p>
                    </div>
                    <div>
                      <p className='m-0'>
                        <span className='fw-bold '>Guest:</span>{' '}
                        {book.participant}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default EventsShow;
