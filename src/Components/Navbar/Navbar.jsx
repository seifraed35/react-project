import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../context/UserContext'
import { CounterContext } from '../../context/CounterContext'
import style from './Navbar.module.css'
export default function Navbar() {
    //==========================================================variables section===========================================================

 let {token ,setToken} = useContext(UserContext)
 let {counter} = useContext(CounterContext)
 let navigate = useNavigate();
    //==========================================================logOut section===========================================================

  function logOut() {
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/login')

  }

  return <>
  <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <div className="container mx-auto">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="fresh-cart-logo"/>
      </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">

      {/* ==========================================================condition section=========================================================== */}

        {token!=null?<>
        <ul className="navbar-nav me-auto mt-2 mt-lg-0 fw-bold">
          <li className="nav-item">
            <Link className="nav-link active" to="/" aria-current="page">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="cart">Cart</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="brands">Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="wishlist">Wishlist</Link>
          </li>

        </ul></>:''}
        
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 fw-bold">
          <li className='nav-item d-flex align-items-center'>
            <i className='fab fa-instagram mx-2'></i>
            <i className='fab fa-facebook mx-2'></i>
            <i className='fab fa-tiktok mx-2'></i>
            <i className='fab fa-twitter mx-2'></i>
            <i className='fab fa-linkedin mx-2'></i>
            <i className='fab fa-youtube mx-2'></i>
          </li>      
      {/* ==========================================================condition section=========================================================== */}
         {token!=null?<>
         <li className='nav-item d-flex align-items-center'>
         <Link className="nav-link p-0" to="/cart">
          <div className={style.cart}>
            <span className={style.count}>{counter}</span>
            <i className="fa-solid fa-cart-shopping text-body-tertiary fs-5"></i>
          </div>
         </Link>
         </li>


          <span onClick={()=>logOut()}  className="nav-link text-bg-danger rounded-4 p-2 cursor-pointer ms-2">Logout</span>
          </>:<><li className='nav-item'>
          <Link className="nav-link" to="login">Login</Link>
          </li>
          <li className='nav-item'>
          <Link className="nav-link" to="register">Register</Link>
          </li>
        </>}
          
        </ul>
        
      </div>
    </div>
  </nav>
  
  </>
}
