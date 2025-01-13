import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../pages/heropart.module.css';

function HeroPart() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Computer Science Engineering Library
        </h1>
        <p className={styles.heroDescription}>
          Sheikh Hasina University's Computer Science Engineering Library: An
          academic hub for CSE department members, offering resources to support
          teachers and students in research, learning, and innovation.
        </p>
        <Link to='/student/dashbord/libdetails' className={styles.ctaButton}>
          More Details
        </Link>
      </div>
    </div>
  );
}

export default HeroPart;
