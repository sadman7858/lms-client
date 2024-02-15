import React, { useEffect, useState } from 'react';
import style from './tca.module.css';
import axios from 'axios';
function Tca() {
  const [tot, setTot] = useState(0);
  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/totalusers')
      .then((res) => {
        setTot(res.data.data[0].total);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={style.org}>
      <div className={style.main}>
        <h1>Over {tot} Happy Users 🎉</h1>
        <p>
          Tailored to CSE's needs, Sheikh Hasina University's Library was
          crafted collaboratively, incorporating direct feedback from faculty
          and students for an optimized research and learning environment.
        </p>
      </div>
    </div>
  );
}

export default Tca;
