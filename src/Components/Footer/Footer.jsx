import React from "react";
import img1 from '../../Assets/images/pngwing.com.png'
import img2 from '../../Assets/images/pngwing.com (1).png'

export default function Footer() {
  return (
    <div className="py-5 bg-main-light">
      <div className="container">
        <h1 className="py-2">Get the Fresh Cart App</h1>
        <p>we will Send you a link Lorem, ipsum dolor.</p>
        <div className="row">
          <div className="col-md-9">
            <input className="form-control" placeholder="Email" type="email" />
          </div>
          <div className="col-md-3">
            <button className='form-control btn bg-main text-white'>send a link</button>
          </div>
        <hr />
        <div className=" d-flex justify-content-between align-items-center">
        <div className="col-md-5">
        <h4>Payment Partners</h4>
        <img width={150} className=" cursor-pointer" src={img1} alt="" />
        </div>
        <div className="col-md-5">
        <h4>Get Deleviry with FreshCart</h4>
          <img width={150} className="cursor-pointer" src={img2} alt="" />
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}
