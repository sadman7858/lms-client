import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './dashbord.module.css';
import { toast } from 'react-toastify';
import { MdOutlinePending } from 'react-icons/md';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdLocalLibrary } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaOdysee } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GiTireIronCross } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout, AiFillCodepenCircle } from 'react-icons/ai';
import { GoGitPullRequest } from 'react-icons/go';
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import './extra.css';
function Dashbord() {
  const navigate = useNavigate();
  const [leftvisible, setLeftvisible] = useState(false);
  const handleHamburger = () => {
    setLeftvisible(!leftvisible);
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:4000/auth/logout')
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem('valid');

          navigate('/');
        } else {
          toast.error('Something Wrong in Logout', { position: 'top-center' });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={` ${style.main}`}>
        <div className={` fixed-top  ${style.fixednav}`}>
          <div className={`  text-danger ${style.headenav}`}>
            <div className={`fs-2 fw-bold ${style.navleft}`}>
              <span className={style.menu_icon}>
                {' '}
                {leftvisible ? (
                  <GiTireIronCross onClick={handleHamburger} />
                ) : (
                  <GiHamburgerMenu onClick={handleHamburger} />
                )}
              </span>
            </div>
            <div className={`fs-2 fw-bold ${style.navleft}`}>
              <span>
                {' '}
                <MdLocalLibrary />
              </span>
              <span style={{ color: 'white' }}>E-LMS</span>
            </div>
            <div className={`fs-2 fw-bold ${style.navleft}`}>
              <span className={style.numbicon}> </span>
              <span className={style.number}> +8801786224382</span>
            </div>

            <div className={style.mainname}>
              <h3 className='fs-2 fw-bold '>
                {' '}
                <span style={{ color: 'red' }}>Library</span>{' '}
                <span style={{ color: 'rgb(20, 150, 90)' }}>Management</span>{' '}
                <span style={{ color: 'rgb(200, 100, 50)' }}>System</span>
              </h3>
            </div>
          </div>
        </div>
        <div className={` ${style.content}`}>
          <div
            className={` vh-100  ${style.leftSidebar} ${
              leftvisible ? style.responleft : ''
            }`}
          >
            <div className={` ${style.part} ${style.partdash}`}>
              <Link to='/dashbord' className={style.link}>
                <span>
                  <i className='bi bi-speedometer2'></i>
                </span>
                <span>Dashboard</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/profile'} className={style.link}>
                <span>
                  <CgProfile />
                </span>
                <span>Profile</span>
              </Link>
            </div>

            <div className={` ${style.part} `}>
              <NavDropdown
                style={{
                  color: 'white',
                  fontSize: '24px',
                }}
                title={
                  <>
                    <FaOdysee /> Books
                  </>
                }
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item
                  style={{ backgroundColor: ' #263043' }}
                  className={`${style.extra}`}
                >
                  <Link
                    to={'/dashbord/addbook'}
                    className={style.link}
                    style={{ color: 'white' }}
                  >
                    <span>Add Books</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{ backgroundColor: ' #263043' }}
                  className={`${style.extra}`}
                >
                  <Link
                    to={'/dashbord/showbook'}
                    className={style.link}
                    style={{ color: 'white' }}
                  >
                    <span>Show Books</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/acceptrequestbook'} className={style.link}>
                <span>
                  <GoGitPullRequest />
                </span>
                <span>Accepted Book</span>
              </Link>
            </div>
            <div className={` ${style.part} `}>
              <NavDropdown
                style={{
                  color: 'white',
                  fontSize: '24px',
                }}
                title={
                  <>
                    <AiFillCodepenCircle /> Pending Status
                  </>
                }
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item
                  style={{ backgroundColor: ' #263043' }}
                  className={`${style.extra}`}
                >
                  <Link
                    to='/dashbord/issupending'
                    className={style.link}
                    style={{ color: 'white' }}
                  >
                    <span>Issue Pending</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{ backgroundColor: ' #263043' }}
                  className={`${style.extra}`}
                >
                  <Link
                    to='/dashbord/returnpending'
                    className={style.link}
                    style={{ color: 'white' }}
                  >
                    <span>Return Pending</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            {/* events related options */}
            <div className={` ${style.part} `}>
              <NavDropdown
                style={{
                  color: 'white',
                  fontSize: '24px',
                }}
                title={
                  <>
                    <AiFillFileAdd /> Events
                  </>
                }
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item
                  style={{ backgroundColor: ' #263043' }}
                  className={`${style.extra}`}
                >
                  <Link
                    to={'/dashbord/addevents'}
                    className={style.link}
                    style={{ color: 'white' }}
                  >
                    <span>Add Events</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{ backgroundColor: ' #263043' }}
                  className={`${style.extra}`}
                >
                  <Link
                    to={'/dashbord/showEvn'}
                    className={style.link}
                    style={{ color: 'white' }}
                  >
                    <span>Show Events</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/alluser'} className={style.link}>
                <span>
                  <MdOutlinePending />
                </span>
                <span>All Users</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link onClick={handleLogout} className={style.link}>
                <span>
                  <AiOutlineLogout />
                </span>
                <span>Logout</span>
              </Link>
            </div>
          </div>
          <div className={` ${style.rightContent}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
