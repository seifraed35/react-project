import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import { CartContext } from '../../context/CartContext';
export default function UserAdress() {
  const [isLodaing, setIsLodaing] = useState(false)
  let {onlinePayment,cartId} = useContext(CartContext);
  async function handleUserAdress(values) {
    setIsLodaing(true)
    let response = await onlinePayment(cartId,'http://localhost:3000',values)
    window.location.href=response.data.session.url
    setIsLodaing(false)
  }
  let formik=useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:handleUserAdress
  })
  return <>
  <div className="w-75 mx-auto py-4 mt-5 my-5">
    <form onSubmit={formik.handleSubmit} >
      <label className='fw-bold mb-1' htmlFor="details">Details :</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} name='details' className='form-control mb-1' id='details' type="text" />
      <label className='fw-bold mb-1' htmlFor="phone">Phone :</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' className='form-control mb-1' id='phone' type="text" />
      <label className='fw-bold mb-1' htmlFor="city">City :</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} name='city' className='form-control mb-1' id='city' type="text" />
      {isLodaing?<button  type='button' className='btn bg-main text-white w-100 rounded-4 p-1 mt-2'>
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
          </div>
            </button>:<button type='submit' className='btn mt-2 w-100 bg-main text-white'>Check Out</button>
}
    </form>
  </div>
  
  </>
}
