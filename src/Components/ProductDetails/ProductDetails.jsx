import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
  let {addToCart} = useContext(CartContext);
  const [islodaing, setIslodaing] = useState(false)

  async function addProductToCart(Id) {
  setIslodaing(true)
  let response = await addToCart(Id)
  if (response.data?.status == 'success') {
    setIslodaing(false)
    toast.success('Successfully added !', {
      style: {
        border: '1px solid #0aad0a',
        padding: '16px',
        color: '#0aad0a',
      },
      iconTheme: {
        primary: '#0aad0a',
        secondary: '#FFFAEE',
      },
    });
  }
  else {
    setIslodaing(false)
    toast.error('Not added', {
      style: {
        border: '1px solid #D30000',
        padding: '16px',
        color: '#D30000',
      },
      iconTheme: {
        primary: '#D30000',
        secondary: '#FFFAEE',
      },
    });
  }
 }

let params = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).catch((err)=>err)
  }
  let {data} = useQuery('productDetails',()=>getProductDetails(params.id))
  let productDetails = data?.data.data;
  return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>{`${productDetails?.title}`} </title>
      </Helmet>
    {productDetails?<div className='row mx-auto align-items-center my-3 container'>
    <div className="col-md-4">
      <img className='w-100' src={productDetails?.imageCover} alt="" />
    </div>
    <div className="col-md-8">
      <h3>{productDetails?.title}</h3>
      <h5>{productDetails?.description}</h5>
      <h5 className='text-main'>{productDetails?.category.name}</h5>
      <div className='d-flex justify-content-between'>
      <h5 className='text-main'>{productDetails?.price} EGP</h5>
      <p className='fw-bold'>
      {productDetails?.ratingsAverage}1
        <i className='fas fa-star rating-color ms-2'>
        </i>
      </p>
      </div>
      {islodaing?<button type='button' className='btn bg-main text-white rounded-4 mb-3 p-0 w-100'>
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
          </div>
            </button>:<button onClick={()=>addProductToCart(params.id)} className='btn bg-main text-white rounded-4 mb-3 w-100'>add to cart</button>
          }  
            </div>
    </div>:''}
  </>
}
