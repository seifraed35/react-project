import React from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((response)=>response).catch((error)=>error)
  }
  let {data} = useQuery('brands',getBrands)
  let brandsItems = data?.data?.data
  console.log(brandsItems);
  return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Brands</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
  <div className="row w-75 g-3 container mx-auto my-5">
    <h2  className='text-center text-main fw-bold'>All Brands</h2>
  {brandsItems? brandsItems.map((brands)=><div key={brands._id} className="col-md-3 product px-2 text-center cursor-pointer">
    <div className='w-100 mx-auto rounded-3'>
      <img className='w-100' src={brands.image} alt="" />
      <h3 className='fw-bold'>{brands.name}</h3>
    </div>
    </div>) :''}
  </div>
  
  </>
}
