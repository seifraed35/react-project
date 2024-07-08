import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../context/WishListContext';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/CartContext';
export default function WishList() {
  const {removeFromWishList , getLoggedUserWishList} = useContext(WishListContext)
  const [wishlistDetails, setWishlistDetails] = useState(null)
  const [isLodaing, setisLodaing] = useState(false)
  const { addToCart } = useContext(CartContext);
  async function getWishList(){
    setisLodaing(true)
    let {data} =  await getLoggedUserWishList()
    if(data?.status === 'success') {
      setisLodaing(false)
      setWishlistDetails(data)
      
    }
  }
  useEffect(()=>{getWishList()},[])
  //==============
  async function removeProduct(Id){
    setisLodaing(true)
    let {data} = await removeFromWishList(Id)
    if(data?.status ==='success') {
      setisLodaing(false)

      getWishList()
    }
  }

  async function addProductToCart(id) {
    let response = await addToCart(id);

    if (response.data?.status === 'success') {
      toast.success('Added to cart !', {
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
    } else {
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

  return <>
  

  
  <Helmet>
    <meta charSet="utf-8" />
    <title>Wishlist</title>
    <link rel="canonical" href="http://mysite.com/example" />
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
  </div>:<>
  <div className='w-75 mx-auto p-3  min-height mt-5'> 
    <h2>wishlist</h2>
  {wishlistDetails?<>
      <div>
        <h5 className='text-main'>Total Items : {wishlistDetails?.count}</h5>
        </div>
    {wishlistDetails?.data.map((product)=>{
      return <div key={product._id} className='row align-items-center border-bottom'>
        <div className='col-md-2'>
          <img className='w-75 my-2' src={product.imageCover} alt="" />
        </div>
        <div className='col-md-10'>
          <div className='d-flex justify-content-between'>
            <div>
            <h4>{product.title.split(' ').slice(0,3).join(' ')}</h4>
             <button onClick={()=>removeProduct(product._id)}  className=' btn fw-bold'> <i className='font-lg text-main fas fa-trash-can'></i> Remove</button>
            </div>
            <div>
              <button onClick={()=>addProductToCart(product._id)} type="button" class="btn btn-outline-success">Add to cart</button>
              
            </div>
          </div>

        </div>
      </div>
    })}
    </>:''}
      </div></>}
    


  </>
}
