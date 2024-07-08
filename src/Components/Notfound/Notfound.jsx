import React from 'react'
import img from '../../Assets/images/error.svg'
export default function Notfound() {
  return <>
  <div className='my-5 text-center'>
    <h2>Page Not Found!</h2>
    <img className='w-50' src={img} alt="not found" />
  </div>
  </>
}
