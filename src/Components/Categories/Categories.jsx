import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((response)=>response).catch((error)=>error)
  }
  let {data} = useQuery('categories',getCategories)
  let categoryItems = data?.data?.data
  console.log(categoryItems);
  return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Categories</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
  <div className="row w-75 g-3 container mx-auto my-5">
  {categoryItems? categoryItems.map((category)=><div key={category._id} className="col-md-4 product px-2 text-center text-main cursor-pointer">
    <div className='w-100 mx-auto rounded-3'>
      <img className='w-100 test' src={category.image} alt="" />
      <h3 className='fw-bold'>{category.name}</h3>
    </div>
    </div>) :''}
  </div>
  
  
  </>
}
