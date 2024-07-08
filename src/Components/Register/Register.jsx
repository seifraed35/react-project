import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register() {

    //==========================================================variables section===========================================================
  let navigate = useNavigate();
  const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
  const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ 
  const [error, setError] = useState(null)
  const [isLodaing, setIsLodaing] = useState(false)

 //==========================================================Yup section=================================================================
  const validationSchema = Yup.object({
    name:Yup.string().min(3,'min legth is 3').max(10,'max legth is 10').required('name is required'),
    email:Yup.string().email('email is invalid').required('email is required'),
    phone:Yup.string().matches(phoneRegex,'invalid phone number').required('phone required'),
    password:Yup.string().matches(passwordRegex,'passwoed is invalid').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],`re-password doesn't match`).required('rePassword is required')
  })
   //==========================================================registerSubmit section=========================================================

  async function registerSubmit(values) {
    setIsLodaing(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setIsLodaing(false)
      setError(err.response.data.message)
    })
    if(data.message === 'success') {
      setIsLodaing(false)
      navigate('/login')
    }
  }
   //==========================================================Formik section=========================================================

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },validationSchema,
    onSubmit:registerSubmit
  });
  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
      <div className="w-75 mx-auto py-4 mt-5 my-5">
        {error?<div className="alert alert-danger">{error}</div>:''}
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className='fw-bold' htmlFor="name">Name : </label>
          <input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id='name' className='form-control mb-2' />
          {formik.errors.name && formik.touched.name?<div className='text-danger mb-2 fw-bold'>{formik.errors.name}</div>:''}

          <label className='fw-bold' htmlFor="phone">Phone : </label>
          <input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id='phone' className='form-control mb-2' />
          {formik.errors.phone && formik.touched.phone?<div className='text-danger mb-2 fw-bold'>{formik.errors.phone}</div>:''}

          <label className='fw-bold' htmlFor="email">Email : </label>
          <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' className='form-control mb-2' />
          {formik.errors.email && formik.touched.email?<div className='text-danger mb-2 fw-bold'>{formik.errors.email}</div>:''}

          <label className='fw-bold' htmlFor="password">Password : </label>
          <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='password' className='form-control mb-2' />
          {formik.errors.password && formik.touched.password?<div className='text-danger mb-2 fw-bold'>{formik.errors.password}</div>:''}

          <label className='fw-bold' htmlFor="rePassword">rePassword : </label>
          <input name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" id='rePassword' className='form-control mb-2' />
          {formik.errors.rePassword && formik.touched.rePassword?<div className='text-danger mb-2 fw-bold'>{formik.errors.rePassword}</div>:''}

          {isLodaing?<button  type='button' className='btn bg-main text-white'>
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
          </div>
            </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>
          }
        </form>
      </div>
    </>
  );
}
