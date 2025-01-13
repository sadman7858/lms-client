import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../pages/createaccount.module.css';

function CreateAccount() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    selected: 'student',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      const res = await axios.post(
        'http://localhost:4000/auth/createaccount',
        formData
      );
      if (res.data.status) {
        toast(`${res.data.role} account created successfully!`, {
          position: 'top-center',
        });
        navigate('/login');
      } else {
        toast.error(res.data.err, { position: 'top-center' });
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred. Please try again.', {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleCreate}
          encType='multipart/form-data'
        >
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.warning}>
            *If the email is not valid, you will not receive some important
            benefits*
          </p>

          <div className={styles.formGroup}>
            <h4>Select Your Role:</h4>
            <div className={styles.roleSelection}>
              <label className={styles.roleLabel}>
                <input
                  type='radio'
                  value='student'
                  name='selected'
                  checked={values.selected === 'student'}
                  onChange={handleChange}
                />
                Student
              </label>
              <label className={styles.roleLabel}>
                <input
                  type='radio'
                  value='teacher'
                  name='selected'
                  checked={values.selected === 'teacher'}
                  onChange={handleChange}
                />
                Teacher
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='image'>Profile Photo:</label>
            <input
              type='file'
              id='image'
              name='image'
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className={styles.button} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
