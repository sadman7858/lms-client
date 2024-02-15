import React, { useState } from 'react';
import style from './addbook.module.css';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import './extra.css';
function AddEvents() {
  const [values, setValues] = useState({
    title: '',
    desc: '',
    shedule: '',
    location: '',
    participant: '',
  });
  const handleSub = (e) => {
    e.preventDefault();

    // let formData = new FormData();
    // formData.append();
    // formData.append();
    // formData.append();
    // formData.append('participant', values.participant);
    // formData.append('location', values.location);
    // console.log(formData);
    axios
      .post('http://localhost:4000/auth/addevent', {
        title: values.title,
        desc: values.desc,
        shedule: values.shedule,
        participant: values.participant,
        location: values.location,
      })
      .then((res) => {
        if (res.data.status) {
          setValues({
            title: '',
            desc: '',
            shedule: '',
            location: '',
            participant: '',
          });
        } else {
          toast('Add event not work', { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };
  return (
    <div className={style.main}>
      <div className={style.content}>
        <form action='' onSubmit={handleSub} encType='multipart/form-data'>
          <div className={style.inp}>
            <label htmlFor='title'>
              <strong>Event Title:</strong>{' '}
            </label>
            <input
              type='text'
              name='title'
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              id='title'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='desc'>
              <strong>Description</strong>{' '}
            </label>
            <textarea
              type='text'
              cols={28}
              rows={4}
              value={values.desc}
              onChange={(e) => setValues({ ...values, desc: e.target.value })}
              name='desc'
              id='desc'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='shedule'>
              <strong>Shedule Date:</strong>{' '}
            </label>
            <input
              type='date'
              min={getCurrentDate()}
              value={values.shedule}
              onChange={(e) =>
                setValues({ ...values, shedule: e.target.value })
              }
              name='shedule'
              id='shedule'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='location'>
              <strong>Location:</strong>{' '}
            </label>
            <input
              type='text'
              value={values.location}
              onChange={(e) =>
                setValues({ ...values, location: e.target.value })
              }
              name='location'
              id='location'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='participant'>
              <strong>Participant:</strong>{' '}
            </label>
            <input
              type='text'
              value={values.participant}
              onChange={(e) =>
                setValues({ ...values, participant: e.target.value })
              }
              name='participant'
              id='participant'
              required
            />
          </div>

          <div className={style.btn}>
            <Button variant='outline-warning' type='submit'>
              Add Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvents;
