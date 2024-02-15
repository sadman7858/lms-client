import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { GiTireIronCross } from 'react-icons/gi';
import style from './studenthome.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './modals.module.css';
function UserDltModal({ user }) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState('');
  console.log(user);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/studentauth/userInfoAll/${user.id}`)
      .then((res) => {
        setInfo(res.data.organizedResult);
        toast.error(res.data.err, { position: 'top-right' });
        setShow(false);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <p className={style.str} onClick={handleShow}>
        <p className={style.str} onClick={handleShow}>
          <img
            className={style.cursorPointer}
            src={`http://localhost:4000/images/${user.profilepic}`}
            alt=''
          />
        </p>
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className={`${styles.bgmd}`}>
          <Modal.Title>User Details</Modal.Title>
          <h3 className={`${styles.bgmdclose}`} onClick={handleClose}>
            <GiTireIronCross />
          </h3>
        </Modal.Header>
        <Modal.Body className={`${styles.bgmd}`}>
          <p>name: {info.uname}</p>
          <p>email: {info.uemail}</p>
          {info &&
            info.books.map((bk, i) => (
              <div key={i}>
                <p>{bk.bname}</p>
                <p style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <p>
                    book review: <span>{bk.brev} </span>
                  </p>
                  <p>
                    {' '}
                    semester: <span>{bk.bsem}</span>
                  </p>
                </p>
              </div>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserDltModal;
