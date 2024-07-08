import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";
import axios from 'axios';
export default function CategorySlider() {
  let {data} = useQuery('categorySlider',getCategory)
  let category = data?.data.data;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
    function getCategory(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }


  return <>
  {category?  <Slider {...settings}>
      {category.map((category)=>< img height={200} key={category._id} src={category.image}/>)}
      </Slider>:''}
  </>
  }
