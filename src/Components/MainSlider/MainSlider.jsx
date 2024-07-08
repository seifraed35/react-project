import React from 'react'
import Slider from "react-slick";
import slide1 from '../../Assets/images/slider-image-3.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-1.jpeg'
import blog1 from '../../Assets/images/grocery-banner-2.jpeg'
import blog2 from '../../Assets/images/grocery-banner.png'
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000 }
  return <>
  <div className="row gx-0 my-2">
  <div className="col-md-10">
  <Slider {...settings}>
    <img height={400} className='w-100' src={slide1} alt="slider-image1" />
    <img height={400} className='w-100' src={slide2} alt="slidert-image2" />
    <img height={400} className='w-100' src={slide3} alt="slider-image3" />
    </Slider>
  </div>
  <div className="col-md-2">
    <img height={200} className='w-100' src={blog1} alt="blog-image1" />
    <img height={200} className='w-100' src={blog2} alt="blog-image2" />
  </div>
  </div>
  </>
}
