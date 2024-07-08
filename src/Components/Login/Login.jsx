import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Login() {
  //==========================================================variables section===========================================================
  let { setToken } = useContext(UserContext);
  let navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [error, setError] = useState(null);
  const [isLodaing, setIsLodaing] = useState(false);

  //==========================================================Yup section=================================================================

  const validationSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(passwordRegex, 'passwoed is invalid').required('password is required'),
  });
  //==========================================================loginSubmit section=========================================================

  async function loginSubmit(values) {
    setIsLodaing(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
        setIsLodaing(false);
        setError(err.response.data.message);
      });
    if (data.message === 'success') {
      setIsLodaing(false);
      localStorage.setItem('userToken', data.token);
      setToken(data.token);
      navigate('/');
    }
  }
  //==========================================================Formik section=========================================================

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='w-50 mx-auto py-4 mt-5'>
        {error ? <div className='alert alert-danger'>{error}</div> : ''}
        <h2 className='my-4'>login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className='fw-bold' htmlFor='email'>
            Email :{' '}
          </label>
          <input
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            id='email'
            className='form-control mb-4'
          />
          {formik.errors.email && formik.touched.email ? (
            <div className='text-danger mb-2 fw-bold'>
              {formik.errors.email}
            </div>
          ) : (
            ''
          )}

          <label className='fw-bold' htmlFor='password'>
            Password :{' '}
          </label>
          <input
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            id='password'
            className='form-control mb-4'
          />
          {formik.errors.password && formik.touched.password ? (
            <div className='text-danger mb-2 fw-bold'>
              {formik.errors.password}
            </div>
          ) : (
            ''
          )}

          {isLodaing ? (
            <button type='button' className='btn bg-main text-white rounded-4 mb-3 '>
              <div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type='submit'
              className='btn bg-main text-white my-2'
            >
              Login
            </button>
          )}
          <Link
            className='ms-4 text-black text-decoration-none fw-bold'
            to='/register'
          >
            Register Now
          </Link>
        </form>
      </div>
    </>
  );
}
