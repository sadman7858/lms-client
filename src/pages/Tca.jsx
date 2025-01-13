import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../pages/tca.module.css';

function Tca() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/totalusers')
      .then((res) => {
        setTotalUsers(res.data.data[0].total);
      })
      .catch((err) => console.error('Error fetching total users:', err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Over {totalUsers} Happy Users 🎉</h1>
        <p className={styles.description}>
          Tailored to CSE's needs, Sheikh Hasina University's Library was
          crafted collaboratively, incorporating direct feedback from faculty
          and students for an optimized research and learning environment.
        </p>
      </div>
    </div>
  );
}

export default Tca;
