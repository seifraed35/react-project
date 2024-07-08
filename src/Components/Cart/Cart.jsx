import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/CartContext';
import { CounterContext } from '../../context/CounterContext';
import { ThreeDots } from 'react-loader-spinner'
import img from '../../Assets/images/undraw_empty_cart_co35 (1).svg'
import { Link } from 'react-router-dom';
export default function Cart() {
  //============================================================DECLARTIONS============================================
  let {getLoggedUserCart,removeFromCart,updateProductQuantity}=useContext(CartContext)
  let {setCounter} = useContext(CounterContext)
  const [cartDetails, setCartDetails] = useState(null)
  const [isLodaing, setisLodaing] = useState(false)
  //============================================================GET-CART-FUNC==========================================
  async function getCart(){
    setisLodaing(true)
    let {data} =  await getLoggedUserCart()
    if(data?.status === 'success') {
      setisLodaing(false)
      setCartDetails(data)
      setCounter(data?.numOfCartItems)
    }
    else {
      setisLodaing(false)
    }
  }
  useEffect(()=>{getCart()},[])
    //============================================================REMOVE-FUNC==========================================

  async function removeProduct(Id){
    setisLodaing(true)
    let {data} = await removeFromCart(Id)
    if(data?.status === 'success') {
      setisLodaing(false)
      setCartDetails(data)
      setCounter(data?.numOfCartItems)

    }
  }
    //============================================================UPDATE-CART-FUNC==========================================
  async function updateCount(Id,count) {
    setisLodaing(true)
    let {data} = await updateProductQuantity(Id,count)
    if(data?.status === 'success') {
      setisLodaing(false)
      setCartDetails(data)
      
    }
  }
      //============================================================CLEAR-CART-FUNC==========================================

  return <>
  <Helmet>
    <meta charSet="utf-8" />
    <title>Cart </title>
      </Helmet>
  
  {isLodaing?<div className='w-100 d-flex justify-content-center align-items-center vh-100' >
  <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#4fa94d" 
    ariaLabel="three-dots-loading"  
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
 />
  </div>:<div className='w-75 mx-auto p-3  min-height mt-5'>
    <h3>Shoping Cart</h3>
    
    
    {cartDetails?<><div className='d-flex justify-content-between mt-3'>
      <div>
         <h5 className='text-main'>Total Cart Price : {cartDetails?.data.totalCartPrice}</h5>
      </div>
      <div>
        <h5 className='text-main'>Total Cart Items : {cartDetails?.numOfCartItems}</h5>
        </div>
    </div>
    {cartDetails?.data.products?.map((product)=>{
      return <div key={product.product._id} className='row align-items-center border-bottom'>
      <div className="col-md-2">
        <img className='w-75 my-2' src={product.product.imageCover} alt="" />
      </div>
      <div className="col-md-10">
        <div className='d-flex justify-content-between'>
          <div>
        <h4>{product.product.title.split(' ').slice(0,3).join(' ')}</h4>
        <h5 className='text-main'>Price : {product.price} EGP</h5>
        <button onClick={()=>removeProduct(product.product._id)}  className=' btn fw-bold'> <i className='font-lg text-main fas fa-trash-can'></i> Remove</button>
          </div>
          <div>
            <button onClick={()=>updateCount(product.product._id,product.count+1)} className='btn btn-outline-success rounded-4'>+</button>
            <span className='fw-bold mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product._id,product.count-1)}  className='btn btn-outline-danger rounded-4'>-</button>
          </div>
        </div>
      </div>
    </div> 
    } )}
    <div className='d-flex justify-content-between'>
    <Link to={'/address'} className='btn bg-main text-white m-2'>Pay online</Link>
    <Link to={'/paycash'} className='btn bg-main text-white m-2'>Cash On Deleviry</Link>
    </div>
    </>:<>
    <div className='d-flex justify-content-between mt-3'>
      <div>
         <h5 className='text-main'>Total Cart Price : 0</h5>
      </div>
      <div>
        <h5 className='text-main'>Total Cart Items : 0</h5>
        </div>
    </div>
    <div className='text-center align-items-center'>
     <img className='w-25' src={img} alt="not found" />
     <h2>Empty Cart</h2>
      </div>
      </>}
        
  </div>}
  
  </>
}
