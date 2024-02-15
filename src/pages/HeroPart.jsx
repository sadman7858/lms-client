import React from 'react';
import style from './heropart.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
function HeroPart() {
  return (
    <div className={style.main}>
      <h1>Computer Science Engineering Library</h1>
      <p>
        Sheikh Hasina University's Computer Science Engineering Library: An
        academic hub for CSE department members, offering resources to support
        teachers and students in research, learning, and innovation.
      </p>
      <div className={style.btn}>
        <Link to='/student/dashbord/libdetails'>
          <button
            className={`rounded-pill ${style.btn1} px-4 py-2 fs-5 fw-bold`}
          >
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeroPart;
