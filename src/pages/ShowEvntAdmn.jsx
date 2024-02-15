import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './showbook.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function ShowEvntAdmn() {
  const [evnt, setEvnt] = useState([]);
  const [info, setInfo] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/showevent')
      .then((res) => {
        if (res.data.status) {
          setEvnt(res.data.data);
        } else {
          toast('event not fetch', { position: 'top-center' });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleUsr = (id) => {
    axios
      .get(`http://localhost:4000/auth/eventUser/${id}`)
      .then((res) => {
        setInfo(res.data.reviewResult);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={style.main}>
      <div className={style.content}>
        {evnt.map((evn, i) => {
          return (
            <div key={i} className={style.card}>
              <div className={style.cardinfo}>
                <h6>
                  {' '}
                  <strong> Event name:</strong> {evn.title}
                </h6>
                <h6>
                  {' '}
                  <strong>Description:</strong> {evn.description}
                </h6>
                <h6>
                  {' '}
                  <strong> Create_date:</strong> {evn.create_date}
                </h6>

                <h6>
                  {' '}
                  <strong>Shedule_date:</strong> {evn.shedule_date}
                </h6>
                <h6>
                  {' '}
                  <strong> Participant:</strong> {evn.participant}
                </h6>

                <h6>
                  {' '}
                  <strong>Location:</strong> {evn.location}
                </h6>
                <Button onClick={() => handleUsr(evn.id)} variant='warning'>
                  Register User
                </Button>
                {info && info.length > 0 && (
                  <select
                    className='ms-1 mt-2 bg-black text-white'
                    name=''
                    id=''
                  >
                    {info.map((inf) =>
                      inf.event_id === evn.id ? (
                        <option value={inf.name}>
                          {inf.name}-{inf.email}
                        </option>
                      ) : null
                    )}
                  </select>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowEvntAdmn;
