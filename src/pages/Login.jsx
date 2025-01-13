import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './login.module.css';
import '../pages/login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  axios.defaults.withCredentials = true;

  const handleSub = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');

    axios
      .post('http://localhost:4000/auth/adminlogin', { email, password })
      .then((res) => {
        if (res.data.loginstatus && res.data.role === 'admin') {
          localStorage.setItem('valid', true);
          navigate('/dashbord');
        } else if (res.data.loginstatus && res.data.role === 'student') {
          localStorage.setItem('valid', true);
          navigate('/student/dashbord');
        } else if (res.data.loginstatus && res.data.role === 'teacher') {
          localStorage.setItem('valid', true);
          navigate('/student/dashbord');
        } else {
          setErr(res.data.err || 'Login failed. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        setErr('An unexpected error occurred. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className='login-container'>
      <div className='login-card'>
        <form className='login-form' onSubmit={handleSub}>
          <h2 className='login-title'>Welcome Back</h2>
          {err && <p className='error-message'>{err}</p>}
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your password'
            />
          </div>
          <button className='login-button' type='submit' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className='create-account'>
          <Link to='/createaccount' className='create-account-link'>
            Create a new account
          </Link>
        </div>
      </div>
    </div>
    // <div className={style.content}>
    //   <div className={style.main}>
    //     <Form className={style.form} onSubmit={handleSub}>
    //       {err && <p style={{ color: 'red' }}>{err}</p>}
    //       <Form.Group className='mb-3' controlId='formBasicEmail'>
    //         <Form.Label>Email address</Form.Label>
    //         <Form.Control
    //           value={email}
    //           required
    //           onChange={(e) => setEmail(e.target.value)}
    //           type='email'
    //           placeholder='Enter email'
    //         />
    //       </Form.Group>

    //       <Form.Group className='mb-3' controlId='formBasicPassword'>
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           value={password}
    //           required
    //           onChange={(e) => setPassword(e.target.value)}
    //           type='password'
    //           placeholder='Password'
    //         />
    //       </Form.Group>

    //       <Button variant='success' type='submit'>
    //         Login
    //       </Button>
    //     </Form>
    //     <div className={style.link}>
    //       <Link to={'/createaccount'}>Create a new account</Link>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
