import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EventDlts() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const handleDone = () => {
    axios
      .post('http://localhost:4000/auth/eventRegi', { eventid: state?.id })
      .then((res) => {
        if (res.data.status === 'true') {
          toast('done!!!', { position: 'top-left' });
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className='  p-5'>
      <div>
        <h4>
          <span className=' fw-bold'>Event Title:</span>{' '}
          <span>{state.title}</span>
        </h4>
        <p>
          <span className=' fw-bold'>Event Description:</span>{' '}
          <span>{state.description}</span>
        </p>
        <p>
          <span className=' fw-bold'>Event Location:</span>{' '}
          <span>{state.location}</span>
        </p>
        <p>
          <span className=' fw-bold'>Event Participant:</span>{' '}
          <span>{state.participant}</span>
        </p>
        <p>
          <span className=' fw-bold'>Event Schedule:</span>{' '}
          <span>{state.shedule_date.split('T')[0]}</span>
        </p>
      </div>
      <div className=' d-flex justify-content-end '>
        <Link to={'/student/dashbord'}>
          <Button className='m-2' variant='danger'>
            Back
          </Button>
        </Link>
        {new Date() > new Date(state.shedule_date.split('T')[0]) ? (
          <p className='m-2 text-danger'>Over</p>
        ) : (
          <Button onClick={handleDone} className='m-2' variant='info'>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}

export default EventDlts;
