import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../pages/eventshow.module.css';
import { MdLocalLibrary } from 'react-icons/md';

function EventsShow() {
  const [events, setEvents] = useState([]);
  const [regi, setRegi] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/showevent')
      .then((res) => setEvents(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/showeventregister')
      .then((res) => setRegi(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      {events.length > 0 && <h1 className={styles.title}>Upcoming Events</h1>}
      <div className='row'>
        {events.map((event, index) => {
          const isRegistered = regi.some((reg) => reg.event_id === event.id);
          return (
            <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
              <div className={styles.card}>
                <div className='p-3'>
                  <div className='d-flex align-items-center mb-3'>
                    <MdLocalLibrary className='fs-1 me-3' />
                    <div>
                      <h2 className={styles.cardTitle}>{event.title}</h2>
                      <p
                        className={
                          isRegistered ? styles.registered : styles.deadline
                        }
                      >
                        {isRegistered
                          ? 'Registered'
                          : `Deadline: ${event.shedule_date.split('T')[0]}`}
                      </p>
                    </div>
                  </div>
                  <p className={styles.cardDescription}>
                    {event.description.slice(0, 70)}...
                  </p>
                  <div className={styles.cardFooter}>
                    <p className={styles.location}>
                      Location: {event.location}
                    </p>
                    <p className={styles.guest}>Guest: {event.participant}</p>
                  </div>
                  {!isRegistered && (
                    <Link to='/student/dashbord/event-dlts' state={event}>
                      <button className={styles.button}>Register Now</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventsShow;
