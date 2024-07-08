import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WishListContext';


export default function FeturedProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);
  const [loadingStates, setLoadingStates] = useState([]);

  async function addProductToCart(id, index) {
    setLoadingStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = true;
      return updatedStates;
    });

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

    setLoadingStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  }
//=========================================================================================
  async function addProductToWishList(id) {
    let response = await addToWishList(id)
    if (response.data?.status === 'success') {
      toast.success('Added to wihslist !', {
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
//=========================================================================================
  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { isLoading,data } = useQuery('products', getProducts);

  useEffect(() => {
    if (data?.data?.data) {
      setLoadingStates(new Array(data.data.data.length).fill(false));
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className='w-100 d-flex justify-content-center align-items-center vh-100'>
          <ThreeDots
            height='80'
            width='80'
            radius='9'
            color='#4fa94d'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            wrapperClassName=''
            visible={true}
          />
        </div>
      ) : (
        <div className='container'>
          <div className='row mt-5 gy-3'>
            {data?.data.data.map((product, index) => {
              return (
                <div key={product._id} className='col-md-2 cursor-pointer product rounded-3'>
                  <Link to={`productdetails/${product.id}`}>
                    <img className='w-100' src={product.imageCover} alt='img' />
                    <p className='text-main'>{product.category.name}</p>
                    <p className='fw-bold'>{product.title.split(' ').slice(0,3).join(' ')}</p>
                    </Link>

                    <div className='d-flex justify-content-between'>
                      <div>
                      <p>{product.price} EGP</p>
                      </div>
                        <div>
                      <p className='pe-3'>
                      <i className='rating-color fas fa-star me-1'></i>
                        {product.ratingsAverage}
                      </p>
                        </div>
                    </div>

                  {loadingStates[index]? <button type='button' className='btn bg-main text-white rounded-4 mb-3 p-0 w-100'>
                      <div class='d-flex justify-content-center'>
                        <div class='spinner-border' role='status'>
                          <span class='sr-only'>Loading...</span>
                        </div>
                      </div>
                    </button>:<>
                    <button onClick={() => addProductToCart(product._id, index)} className='btn bg-main text-white rounded-4 mb-3 w-100'>
                     add to cart
                    </button>
                    <button onClick={() => addProductToWishList(product._id)} className='btn bg-main text-white rounded-4 mb-3 w-100'>
                     add to wishlist
                    </button>
                    </>
                  }
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}